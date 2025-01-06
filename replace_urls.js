/**
 * Asset URL Replace Script for Static Website Build
 *
 * This Node.js script handles the replacement of Directus asset URLs with CDN URLs:
 * - Downloads and caches external assets (images and PDFs) from Directus
 * - Processes HTML and JSON files in a build directory
 * - Replaces remote URLs with digital ocean spaces CDN URLS in the processed files
 *
 */

import glob from 'tiny-glob';
import {readFile, writeFile} from 'fs/promises';
import path from 'node:path';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import {parse} from 'url';

const CONFIG = {
  MAX_RETRIES: 3,
  BASE_RETRY_DELAY: 5000,
  JITTER_MAX: 3000,
  JITTER_MIN: 500,
  FILE_CONCURRENCY: 7,
  CDN_URL: 'correlcms-directus-storage.fra1.cdn.digitaloceanspaces.com/',
};

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

const urlCache = new Map();
const URL = `${process.env.PUBLIC_API_URL}/assets`;
const buildDirectory = process.env.BUILD_DIR || '.svelte-kit/cloudflare';
const asset403Counts = new Map();
const REPLACEMENT_ASSET_ID = 'a525ce03-7e70-446f-9eff-1edd222aa002';
const startTime = Date.now();

async function postbuild() {
  console.log('Starting replacement of Directus URLs with CDN URLs');

  try {
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
    console.log(`Took: ${duration}`);
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
      try {
        if (urlCache.has(url)) {
          const cdnUrl = urlCache.get(url);
          await replaceURL(url, cdnUrl, filePath);
          continue;
        }

        const cdnUrl = convertToCdnUrl(url, type);

        if (cdnUrl && (await validateCdnUrl(cdnUrl))) {
          urlCache.set(url, cdnUrl);
          await replaceURL(url, cdnUrl, filePath);
        } else {
          console.error(`Failed to generate or validate CDN URL for ${url}`);
        }
      } catch (error) {
        console.error(`Failed to process ${url}:`, error);
      }
    }
  }
}

function convertToCdnUrl(urlString, type) {
  try {
    const parsedUrl = parse(urlString);
    const assetId = parsedUrl.pathname.split('/assets/')[1]?.split('?')[0];
    const cdnUrl = `https://${CONFIG.CDN_URL}/${assetId}`;

    if (type === 'image') {
      return `${cdnUrl}.webp`;
    }

    return `${cdnUrl}.pdf`;
  } catch (error) {
    console.error(`Error converting URL ${urlString}:`, error);
    return null;
  }
}

async function validateCdnUrl(url, retryCount = 0) {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': getRandomUserAgent(),
        Connection: 'keep-alive',
      },
    });
    if (response.status === 403) {
      const assetId = url.split(`${CONFIG.CDN_URL}/`)[1]?.split('?')[0];
      if (assetId) {
        const currentCount = asset403Counts.get(assetId) || 0;
        asset403Counts.set(assetId, currentCount + 1);

        if (currentCount + 1 >= 2) {
          console.log(
            `Asset ${assetId} failed twice with 403, trying fallback asset`,
          );
          const newUrl = url.replace(assetId, REPLACEMENT_ASSET_ID);
          return validateCdnUrl(newUrl, retryCount);
        }
      }
      return false;
    }

    if (response.status === 429 && retryCount < CONFIG.MAX_RETRIES) {
      const retryAfter = response.headers.get('Retry-After');
      const waitTime = addJitter(
        retryAfter ? parseInt(retryAfter) * 1000 : CONFIG.BASE_RETRY_DELAY,
      );
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      return validateCdnUrl(url, retryCount + 1);
    }

    return response.ok;
  } catch (error) {
    console.error(`Error validating CDN URL ${url}:`, error);
    return false;
  }
}

const getRandomUserAgent = () => {
  const version = 1;
  const subversion = Math.floor(Math.random() * 9) + 1;
  return `CorrelAidWebsiteImgDl/${version}.${subversion}`;
};

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
      urls.push({url: url, type: 'pdf'});
    }
  }

  return urls;
}

async function replaceURL(originalUrl, cdnUrl, filePath) {
  const fileContent = await readFile(filePath, 'utf8');
  const newFileContent = fileContent.replace(originalUrl, cdnUrl);
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
