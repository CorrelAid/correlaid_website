import glob from 'tiny-glob';
import {createWriteStream} from 'fs';
import {mkdir} from 'node:fs/promises';
import {readFile, writeFile, unlink} from 'fs/promises';
import * as url from 'url';
import * as https from 'https';
import path from 'node:path';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}.local`),
});
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});
dotenv.config({path: path.resolve(process.cwd(), '.env.local')});
dotenv.config({path: path.resolve(process.cwd(), '.env')});

const jitterMultiplier = 1500;

const URL = `${process.env.PUBLIC_API_URL}/assets`;

const buildDirectory = process.env.BUILD_DIR || '.svelte-kit/cloudflare';
const newAssetsDirectory = buildDirectory + '/assets';

const asset403Counts = new Map();
const REPLACEMENT_ASSET_ID = 'a525ce03-7e70-446f-9eff-1edd222aa002';

async function postbuild() {
  await mkdir(newAssetsDirectory, {recursive: true});

  console.log('Starting replacement of files from external sources');

  const files = await glob('**/*', {
    cwd: buildDirectory,
    dot: true,
    absolute: true,
    filesOnly: true,
  });

  const concurrencyLimit = 9;

  const queue = [];
  let activePromises = 0;

  const processQueue = async () => {
    while (queue.length > 0 && activePromises < concurrencyLimit) {
      const task = queue.shift();
      activePromises++;

      try {
        await task();
      } catch (error) {
        console.error('Task error:', error);
      } finally {
        activePromises--;
        processQueue();
      }
    }
  };

  files.forEach((file) => {
    if (file.endsWith('.json') || file.endsWith('.html')) {
      queue.push(async () => {
        const fileContent = await readFile(file, 'utf8');
        await processFile(file, fileContent);
      });
    }
  });

  processQueue();

  while (queue.length > 0 || activePromises > 0) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log('All file processing completed');
}

async function processFile(filePath, fileContent) {
  const urls = await findUrls(fileContent, filePath);

  if (urls.length > 0) {
    for (const {url, type} of urls) {
      // Destructure url and type directly
      const cleanedUrl = url.replace(/\\u002F/g, '/').split('?')[0];

      let downloadPath = cleanedUrl.replace(
        URL,
        `${process.cwd()}/${newAssetsDirectory}`,
      );
      downloadPath += type === 'image' ? '.webp' : '.pdf';

      await downloadFile(url, downloadPath);

      let relativePath = downloadPath.replace(
        `${process.cwd()}/${buildDirectory}`,
        '',
      );
      if (!relativePath.startsWith('/assets')) {
        relativePath = relativePath.substring(relativePath.indexOf('/'));
      }
      await replaceURL(url, relativePath, filePath);
    }
  }
}

async function findUrls(fileContent, filePath) {
  let urlRegexString = URL.replace(/\//g, '(?:\\/|\\\\u002F)');
  urlRegexString = `${urlRegexString}(?:[^"\\s\\\\)]*)`;
  const urlRegex = new RegExp(urlRegexString, 'g');

  const urls = [];
  let match;

  while ((match = urlRegex.exec(fileContent))) {
    const url = match[0];
    if (url.includes('format=webp')) {
      urls.push({url: url, type: 'image'});
    } else {
      try {
        await retryOnTimeout(url);
        urls.push({url: url, type: 'pdf'});
      } catch (error) {
        console.error(`Error checking PDF URL ${url}:`, error);
      }
    }
  }

  return urls;
}

function cleanupUrl(url) {
  return url
    .replace(/([?&])(width|height)=undefined/g, '')
    .replace(/\?&/, '?')
    .replace(/[?&]$/, '');
}

async function retryOnTimeout(url, maxRetries = 5, initialBackoff = 2000) {
  let retryCount = 0;
  const maxBackoff = 30000;
  const assetId = url.split('/assets/')[1]?.split('?')[0];

  while (retryCount < maxRetries) {
    try {
      const jitter = Math.random() * jitterMultiplier;
      await new Promise((resolve) => setTimeout(resolve, jitter));

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 60000);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          Connection: 'keep-alive',
          'User-Agent': 'MyScript/1.0',
          'Accept-Encoding': 'gzip,deflate',
          Accept: '*/*',
        },
        keepalive: true,
      });

      clearTimeout(timeout);

      // Handle 403 errors
      if (response.status === 403) {
        if (assetId) {
          const currentCount = asset403Counts.get(assetId) || 0;
          asset403Counts.set(assetId, currentCount + 1);

          if (currentCount + 1 >= 2) {
            console.log(
              `Asset ${assetId} failed twice with 403, trying fallback asset: ${REPLACEMENT_ASSET_ID}`,
            );
            const newUrl = cleanupUrl(
              url.replace(assetId, REPLACEMENT_ASSET_ID),
            );
            return retryOnTimeout(newUrl, maxRetries, initialBackoff);
          }
        }
        throw new Error(`HTTP error! status: 403`);
      }

      // Handle rate limiting
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter
          ? parseInt(retryAfter) * 1000
          : initialBackoff;
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        continue;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      retryCount++;

      if (retryCount === maxRetries) {
        throw new Error(
          `Failed to fetch ${url} after ${maxRetries} retries: ${error.message}`,
        );
      }

      const backoffTime = Math.min(
        initialBackoff * Math.pow(2, retryCount) +
          Math.random() * jitterMultiplier,
        maxBackoff,
      );

      console.warn(
        `Attempt ${retryCount}/${maxRetries} failed for ${url}. Retrying in ${backoffTime}ms. Error: ${error.message}`,
      );

      await new Promise((resolve) => setTimeout(resolve, backoffTime));
    }
  }
}

async function downloadFile(url, downloadPath) {
  let fileStream;

  try {
    const response = await retryOnTimeout(url);

    // Ensure directory exists
    await mkdir(path.dirname(downloadPath), {recursive: true});

    fileStream = createWriteStream(downloadPath);

    return new Promise((resolve, reject) => {
      const stream = response.body.pipe(fileStream);

      stream.on('finish', () => {
        fileStream.close();
        console.log(`Successfully downloaded: ${url}`);
        resolve();
      });

      stream.on('error', (error) => {
        fileStream.close();
        unlink(downloadPath).catch(console.error);
        reject(error);
      });
    });
  } catch (error) {
    if (fileStream) {
      fileStream.close();
    }
    await unlink(downloadPath).catch(() => {});
    throw error;
  }
}

async function replaceURL(url, relativePath, filePath) {
  const fileContent = await readFile(filePath, 'utf8');
  const newFileContent = fileContent.replace(url, relativePath);
  await writeFile(filePath, newFileContent);
}

if (process.env.PUBLIC_ADAPTER === 'STATIC') {
  postbuild();
} else {
  console.log('Skipping postbuild for adapter: ' + process.env.PUBLIC_ADAPTER);
}

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Promise Rejection:', error);
  process.exit(1);
});
