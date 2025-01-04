import glob from 'tiny-glob';
import {createWriteStream} from 'fs';
import {mkdir} from 'node:fs/promises';
import {readFile, writeFile, unlink} from 'fs/promises';
import * as url from 'url';
import * as https from 'https';
import path from 'node:path';
import dotenv from 'dotenv';
import fetch from 'node-fetch'; // Import fetch for Node.js

// Load environment variables
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

  const filePromises = files.map(async (file) => {
    if (file.endsWith('.json') || file.endsWith('.html')) {
      const fileContent = await readFile(file, 'utf8');
      await processFile(file, fileContent);
    }
  });

  const concurrentPromises = [];
  for (let i = 0; i < filePromises.length; i += concurrencyLimit) {
    const batchPromises = filePromises.slice(i, i + concurrencyLimit);
    concurrentPromises.push(Promise.all(batchPromises));
  }

  try {
    await Promise.all(concurrentPromises);
    console.log('All file processing completed');
  } catch (error) {
    console.error('Error during file processing:', error);
  } finally {
    process.exit(); // Exit in the finally block to ensure it always runs
  }
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
        await retryOnTimeout(url); // Check PDF URLs for timeouts as well
        urls.push({url: url, type: 'pdf'}); // Add if successful
      } catch (error) {
        console.error(`Error checking PDF URL ${url}:`, error);
      }
    }
  }

  return urls;
}

async function retryOnTimeout(url, maxRetries = 5, backoff = 2000) {
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      const jitter = Math.random() * jitterMultiplier * 2;
      await new Promise((resolve) => setTimeout(resolve, jitter));

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 60000);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          Connection: 'keep-alive',
          'User-Agent': 'MyScript/1.0',
        },
      });

      clearTimeout(timeout);
      return response;
    } catch (error) {
      if (error.name === 'AbortError') {
        // Check specifically for AbortError
        retryCount++;
        const backoffTime = Math.min(backoff * Math.pow(2, retryCount), 30000);
        console.warn(
          `Timeout, retrying ${url} after ${backoffTime}ms (attempt ${retryCount + 1}/${maxRetries})`,
        );
        await new Promise((resolve) => setTimeout(resolve, backoffTime));
      } else {
        console.error(`Error fetching ${url}:`, error);
        throw error;
      }
    }
  }

  throw new Error(`Failed to fetch ${url} after ${maxRetries} retries`);
}

async function downloadFile(url, downloadPath) {
  const file = createWriteStream(downloadPath);

  try {
    const response = await retryOnTimeout(url);
    response.body.pipe(file);

    await new Promise((resolve, reject) => {
      file.on('finish', resolve);
      file.on('error', reject);
    });

    console.log(`Downloaded: ${url} to ${downloadPath}`); // Log successful download
  } catch (error) {
    console.error(`Error downloading ${url}:`, error);

    try {
      await unlink(downloadPath);
    } catch (unlinkError) {
      if (unlinkError.code !== 'ENOENT') {
        console.error(`Error deleting file ${downloadPath}:`, unlinkError);
      }
    }
    throw error;
  } finally {
    file.close();
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
