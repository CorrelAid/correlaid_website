/**
 * Asset Localization Script for Static Website Build
 *
 * This Node.js script handles the localization of external assets:
 * - Downloads and caches external assets (images and PDFs) from Directus
 * - Processes HTML and JSON files in a build directory (defaults to '.svelte-kit/cloudflare')
 * - Replaces remote URLs with local file paths in the processed files
 *
 * Features:
 * - Concurrent download management
 * - Error handling with retries
 * - Rate limiting protection
 * - Fallback asset replacement for failed downloads (403 errors)
 * - Progress tracking and logging
 *
 * Only runs when PUBLIC_ADAPTER='STATIC'
 */
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

// Configuration constants
const CONFIG = {
  FILE_CONCURRENCY: 7, // Number of concurrent file processes
  DOWNLOAD_CONCURRENCY: 2, // Number of concurrent downloads
  MAX_RETRIES: 3, // Maximum number of retry attempts
  BASE_RETRY_DELAY: 5000, // Base delay for retries in ms
  DOWNLOAD_TIMEOUT: 300000, // Download timeout in ms (5 minutes)
  JITTER_MAX: 3000, // Maximum jitter in ms
  JITTER_MIN: 500, // Minimum jitter in ms
};

// Utility function to add jitter to delays
const addJitter = (baseDelay) => {
  const jitter =
    Math.random() * (CONFIG.JITTER_MAX - CONFIG.JITTER_MIN) + CONFIG.JITTER_MIN;
  return baseDelay + jitter;
};

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

    const queue = [];
    let activePromises = 0;
    let completedFiles = 0;

    const processQueue = async () => {
      while (queue.length > 0 && activePromises < CONFIG.FILE_CONCURRENCY) {
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
      await new Promise((resolve) => setTimeout(resolve, addJitter(100)));
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
        if (urlToPathCache.has(url)) {
          const cachedPath = urlToPathCache.get(url);
          await replaceURL(url, cachedPath, filePath);
          continue;
        }

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
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      CONFIG.DOWNLOAD_TIMEOUT,
    );

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': getRandomUserAgent(),
        'Accept-Encoding': 'gzip,deflate',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Keep-Alive': 'timeout=300',
        Accept: '*/*',
      },
      compress: true,
      timeout: CONFIG.DOWNLOAD_TIMEOUT,
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
      }, CONFIG.DOWNLOAD_TIMEOUT);

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

async function retryOnTimeout(
  url,
  downloadPath,
  maxRetries = CONFIG.MAX_RETRIES,
) {
  let retryCount = 0;
  const assetId = url.split('/assets/')[1]?.split('?')[0];

  while (retryCount < maxRetries) {
    try {
      if (retryCount > 0) {
        await new Promise((resolve) =>
          setTimeout(resolve, addJitter(Math.random() * 1000)),
        );
      }

      const headResponse = await fetch(url, {
        method: 'HEAD',
        headers: {
          'User-Agent': getRandomUserAgent(),
          Connection: 'keep-alive',
        },
      });

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

      if (headResponse.status === 429) {
        const retryAfter = headResponse.headers.get('Retry-After');
        const waitTime = addJitter(
          retryAfter ? parseInt(retryAfter) * 1000 : CONFIG.BASE_RETRY_DELAY,
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        continue;
      }

      if (!headResponse.ok) {
        throw new Error(`HTTP error! status: ${headResponse.status}`);
      }

      const fileSize = parseInt(
        headResponse.headers.get('content-length') || '0',
      );
      const cleanedUrl = cleanupUrl(url);

      if (fileSize > 5 * 1024 * 1024) {
        console.log(
          `Large file detected (${fileSize} bytes), using chunked download`,
        );
        return downloadFile(cleanedUrl, downloadPath);
      }

      return await downloadFile(cleanedUrl, downloadPath);
    } catch (error) {
      retryCount++;

      if (retryCount === maxRetries) {
        throw error;
      }

      const backoffTime = addJitter(
        CONFIG.BASE_RETRY_DELAY * Math.pow(2, retryCount),
      );
      console.warn(
        `Retry ${retryCount}/${maxRetries} for ${url} in ${backoffTime}ms`,
      );
      await new Promise((resolve) => setTimeout(resolve, backoffTime));
    }
  }
}

const downloadQueue = new Map();
let activeDownloads = 0;

async function queueDownload(url, downloadPath) {
  if (downloadCache.has(url)) {
    return downloadCache.get(url);
  }

  while (activeDownloads >= CONFIG.DOWNLOAD_CONCURRENCY) {
    await new Promise((resolve) => setTimeout(resolve, addJitter(1000)));
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

if (process.env.PUBLIC_ADAPTER === 'STATIC') {
  postbuild().catch((error) => {
    console.error('\nScript failed:', error);
    process.exit(1);
  });
} else {
  console.log('Skipping postbuild for adapter: ' + process.env.PUBLIC_ADAPTER);
}
