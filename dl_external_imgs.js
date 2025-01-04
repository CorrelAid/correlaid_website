import glob from 'tiny-glob';
import {createWriteStream} from 'fs';
import {existsSync} from 'fs';
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

const downloadCache = new Map();
const urlToPathCache = new Map();

const URL = `${process.env.PUBLIC_API_URL}/assets`;

const buildDirectory = process.env.BUILD_DIR || '.svelte-kit/cloudflare';
const newAssetsDirectory = buildDirectory + '/assets';

const asset403Counts = new Map();
const REPLACEMENT_ASSET_ID = 'a525ce03-7e70-446f-9eff-1edd222aa002';

const startTime = Date.now();

async function postbuild() {
  console.log('Starting replacement of files from external sources');

  try {
    await mkdir(newAssetsDirectory, {recursive: true});

    const files = await glob('**/*', {
      cwd: buildDirectory,
      dot: true,
      absolute: true,
      filesOnly: true,
    });

    const targetFiles = files.filter(
      (file) => file.endsWith('.json') || file.endsWith('.html'),
    );
    console.log(`Processing ${targetFiles.length} files...`);

    const concurrencyLimit = 7;
    const queue = [];
    let activePromises = 0;
    let completedFiles = 0;

    const processQueue = async () => {
      while (queue.length > 0 && activePromises < concurrencyLimit) {
        const task = queue.shift();
        activePromises++;

        try {
          await task();
          completedFiles++;
          if (completedFiles % 10 === 0) {
            console.log(
              `Processed ${completedFiles}/${targetFiles.length} files`,
            );
          }
        } catch (error) {
          console.error('Task error:', error);
        } finally {
          activePromises--;
          processQueue();
        }
      }
    };

    targetFiles.forEach((file) => {
      queue.push(async () => {
        const fileContent = await readFile(file, 'utf8');
        await processFile(file, fileContent);
      });
    });

    processQueue();

    while (queue.length > 0 || activePromises > 0) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const duration = Date.now() - startTime;
    console.log(`Files processed: ${completedFiles}/${targetFiles.length}`);
    process.exit();
  } catch (error) {
    console.error('\nScript failed with error:', error);
    throw error;
  }
}

async function processFile(filePath, fileContent) {
  const urls = await findUrls(fileContent, filePath);

  if (urls.length > 0) {
    for (const {url, type} of urls) {
      const cleanedUrl = url.replace(/\\u002F/g, '/').split('?')[0];
      let downloadPath = cleanedUrl.replace(
        URL,
        `${process.cwd()}/${newAssetsDirectory}`,
      );
      downloadPath += type === 'image' ? '.webp' : '.pdf';

      try {
        // Check cache first
        if (urlToPathCache.has(url)) {
          const cachedPath = urlToPathCache.get(url);
          await replaceURL(url, cachedPath, filePath);
          continue;
        }

        // Check if file already exists
        if (existsSync(downloadPath)) {
          let relativePath = downloadPath.replace(
            `${process.cwd()}/${buildDirectory}`,
            '',
          );
          if (!relativePath.startsWith('/assets')) {
            relativePath = relativePath.substring(relativePath.indexOf('/'));
          }
          urlToPathCache.set(url, relativePath);
          await replaceURL(url, relativePath, filePath);
          continue;
        }

        await queueDownload(url, downloadPath);

        let relativePath = downloadPath.replace(
          `${process.cwd()}/${buildDirectory}`,
          '',
        );
        if (!relativePath.startsWith('/assets')) {
          relativePath = relativePath.substring(relativePath.indexOf('/'));
        }
        urlToPathCache.set(url, relativePath);
        await replaceURL(url, relativePath, filePath);
      } catch (error) {
        console.error(`Failed to process ${url}:`, error);
      }
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
        // Just do a HEAD request to check if it's accessible
        const response = await fetch(url, {
          method: 'HEAD',
          headers: {
            'User-Agent': getRandomUserAgent(),
            Connection: 'keep-alive',
          },
        });
        if (response.ok) {
          urls.push({url: url, type: 'pdf'});
        }
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

const getRandomUserAgent = () => {
  const version = 1;
  const subversion = Math.floor(Math.random() * 9) + 1;
  return `CorrelAidWebsiteImgDl/${version}.${subversion}`;
};

async function downloadFile(url, downloadPath) {
  try {
    // 1. Increase fetch timeout and add keep-alive
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 300000); // 5 minutes for large files

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': getRandomUserAgent(),
        'Accept-Encoding': 'gzip,deflate',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Keep-Alive': 'timeout=300', // 5 minutes keep-alive
        Accept: '*/*',
      },
      compress: true,
      timeout: 300000,
    });

    clearTimeout(timeout);

    await mkdir(path.dirname(downloadPath), {recursive: true});

    return new Promise((resolve, reject) => {
      const fileStream = createWriteStream(downloadPath, {
        flags: 'w',
        encoding: 'binary',
        mode: 0o666,
        autoClose: true,
        highWaterMark: 64 * 1024, // 64KB buffer
      });

      const stream = response.body;
      let downloadedSize = 0;
      const totalSize = parseInt(response.headers.get('content-length') || '0');

      const cleanup = (error) => {
        clearTimeout(timeout);
        stream.destroy();
        fileStream.destroy();
        if (error) {
          unlink(downloadPath).catch(() => {});
          reject(error);
        }
      };

      stream.on('data', (chunk) => {
        downloadedSize += chunk.length;

        if (!fileStream.write(chunk)) {
          stream.pause();
        }
      });

      fileStream.on('drain', () => {
        stream.resume();
      });

      stream.on('end', () => {
        fileStream.end();
        resolve();
      });

      stream.on('error', (error) => {
        console.error(`Stream error for ${url}:`, error);
        cleanup(error);
      });

      fileStream.on('error', (error) => {
        console.error(`File stream error for ${downloadPath}:`, error);
        cleanup(error);
      });

      const downloadTimeout = setTimeout(() => {
        cleanup(new Error(`Download timeout after 5 minutes: ${url}`));
      }, 300000);

      fileStream.on('finish', () => {
        clearTimeout(downloadTimeout);
        resolve();
      });
    });
  } catch (error) {
    console.error(`Download failed for ${url}:`, error);
    await unlink(downloadPath).catch(() => {});
    throw error;
  }
}

async function retryOnTimeout(url, downloadPath, maxRetries = 3) {
  let retryCount = 0;
  const assetId = url.split('/assets/')[1]?.split('?')[0];

  while (retryCount < maxRetries) {
    try {
      const headResponse = await fetch(url, {
        method: 'HEAD',
        headers: {
          'User-Agent': getRandomUserAgent(),
          Connection: 'keep-alive',
        },
      });

      // Handle 403 errors
      if (headResponse.status === 403) {
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
            return retryOnTimeout(newUrl, downloadPath, maxRetries);
          }
        }
        throw new Error(`HTTP error! status: 403`);
      }

      // Handle rate limiting
      if (headResponse.status === 429) {
        const retryAfter = headResponse.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 5000;
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        continue;
      }

      if (!headResponse.ok) {
        throw new Error(`HTTP error! status: ${headResponse.status}`);
      }

      const fileSize = parseInt(
        headResponse.headers.get('content-length') || '0',
      );

      // Clean up URL before download
      const cleanedUrl = cleanupUrl(url);

      // Adjust strategy based on file size
      if (fileSize > 5 * 1024 * 1024) {
        console.log(
          `Large file detected (${fileSize} bytes), using chunked download`,
        );
        return downloadFile(cleanedUrl, downloadPath);
      }

      // Regular download for smaller files
      return await downloadFile(cleanedUrl, downloadPath);
    } catch (error) {
      retryCount++;

      if (retryCount === maxRetries) {
        throw error;
      }

      const backoffTime = 5000 * Math.pow(2, retryCount);
      console.warn(
        `Retry ${retryCount}/${maxRetries} for ${url} in ${backoffTime}ms`,
      );
      await new Promise((resolve) => setTimeout(resolve, backoffTime));
    }
  }
}

// 7. Add queue management for concurrent downloads
const downloadQueue = new Map();
const maxConcurrentDownloads = 2; // Reduce concurrent downloads
let activeDownloads = 0;

async function queueDownload(url, downloadPath) {
  // Check download cache
  if (downloadCache.has(url)) {
    return downloadCache.get(url);
  }

  while (activeDownloads >= maxConcurrentDownloads) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  activeDownloads++;
  try {
    const downloadPromise = retryOnTimeout(url, downloadPath);
    downloadCache.set(url, downloadPromise);
    await downloadPromise;
    return downloadPromise;
  } finally {
    activeDownloads--;
  }
}

async function replaceURL(url, relativePath, filePath) {
  const fileContent = await readFile(filePath, 'utf8');
  const newFileContent = fileContent.replace(url, relativePath);
  await writeFile(filePath, newFileContent);
}

// Update the main execution
if (process.env.PUBLIC_ADAPTER === 'STATIC') {
  postbuild().catch((error) => {
    console.error('\nScript failed:', error);
    process.exit(1);
  });
} else {
  console.log('Skipping postbuild for adapter: ' + process.env.PUBLIC_ADAPTER);
}
