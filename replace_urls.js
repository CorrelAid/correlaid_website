import glob from 'tiny-glob';
import {readFile, writeFile} from 'fs/promises';
import path from 'node:path';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

const CONFIG = {
  MAX_RETRIES: 3,
  BASE_RETRY_DELAY: 5000,
  JITTER_MAX: 3000,
  JITTER_MIN: 500,
  FILE_CONCURRENCY: 7,
  CDN_URL: 'correlcms-directus-storage.fra1.cdn.digitaloceanspaces.com/',
  BATCH_SIZE: 50,
  CACHE_MAX_SIZE: 1000,
  REPLACEMENT_ASSET_ID: 'a525ce03-7e70-446f-9eff-1edd222aa002',
};

const urlCache = new Map();
const processedFiles = new Set();
const failedUrls = new Set();

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}.local`),
});
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});
dotenv.config({path: path.resolve(process.cwd(), '.env.local')});
dotenv.config({path: path.resolve(process.cwd(), '.env')});

const addJitter = (baseDelay) => {
  return (
    baseDelay +
    Math.random() * (CONFIG.JITTER_MAX - CONFIG.JITTER_MIN) +
    CONFIG.JITTER_MIN
  );
};

async function validateUrl(url, retryCount = 0) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': `CorrelAidWebsiteImgDl/${process.env.npm_package_version || '1.0.0'}`,
        Connection: 'keep-alive',
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (response.status === 429 && retryCount < CONFIG.MAX_RETRIES) {
      const retryAfter = parseInt(response.headers.get('Retry-After') || '5');
      await new Promise((resolve) =>
        setTimeout(resolve, addJitter(retryAfter * 1000)),
      );
      return validateUrl(url, retryCount + 1);
    }

    return response.status;
  } catch (error) {
    if (retryCount < CONFIG.MAX_RETRIES) {
      await new Promise((resolve) =>
        setTimeout(resolve, addJitter(CONFIG.BASE_RETRY_DELAY)),
      );
      return validateUrl(url, retryCount + 1);
    }
    console.error(`Failed to validate URL ${url}:`, error);
    return 500;
  }
}

const convertToCdnUrl = (urlString, type) => {
  try {
    const url = new URL(urlString);
    const pathParts = url.pathname.split('/assets/');
    if (pathParts.length !== 2) return null;

    const assetId = pathParts[1].split('?')[0];
    if (!assetId) return null;

    const cdnUrl = `https://${CONFIG.CDN_URL}/${assetId}`;
    return type === 'image' ? `${cdnUrl}.webp` : `${cdnUrl}.pdf`;
  } catch (error) {
    console.error(`Error converting URL ${urlString}:`, error);
    return null;
  }
};

async function findUrls(fileContent) {
  const URL = `${process.env.PUBLIC_API_URL}/assets`;
  let urlRegexString = URL.replace(/\//g, '(?:\\/|\\\\u002F)');
  urlRegexString = `${urlRegexString}(?:[^"\\s\\\\)]*)`;
  const urlRegex = new RegExp(urlRegexString, 'g');

  const urls = [];
  let match;

  while ((match = urlRegex.exec(fileContent))) {
    const url = match[0];
    urls.push({
      url,
      type: url.includes('format=webp') ? 'image' : 'pdf',
    });
  }

  return urls;
}

async function replaceURL(originalUrl, cdnUrl, filePath) {
  try {
    const fileContent = await readFile(filePath, 'utf8');
    const newFileContent = fileContent.replace(originalUrl, cdnUrl);
    await writeFile(filePath, newFileContent);
    return true;
  } catch (error) {
    console.error(`Failed to replace URL in ${filePath}:`, error);
    return false;
  }
}

async function processFile(filePath) {
  if (processedFiles.has(filePath)) return;

  try {
    const fileContent = await readFile(filePath, 'utf8');
    const urls = await findUrls(fileContent);

    if (urls.length === 0) {
      processedFiles.add(filePath);
      return;
    }

    for (const {url, type} of urls) {
      if (urlCache.has(url)) {
        await replaceURL(url, urlCache.get(url), filePath);
        continue;
      }

      if (urlCache.size >= CONFIG.CACHE_MAX_SIZE) {
        urlCache.clear();
      }

      const cdnUrl = convertToCdnUrl(url, type);
      if (!cdnUrl) {
        failedUrls.add(url);
        continue;
      }

      const status = await validateUrl(cdnUrl);

      if (status === 200) {
        urlCache.set(url, cdnUrl);
        await replaceURL(url, cdnUrl, filePath);
      } else if (status === 404) {
        const assetId = new URL(url).pathname
          .split('/assets/')[1]
          ?.split('?')[0];
        console.log(
          `Asset ${assetId} failed under ${url} with 404, trying fallback asset`,
        );

        var fallbackUrl = url.replace(assetId, CONFIG.REPLACEMENT_ASSET_ID);
        fallbackUrl = `${fallbackUrl.split('?')[0]}?format=webp`;
        const fallbackStatus = await validateUrl(fallbackUrl);
        if (fallbackStatus === 200) {
          urlCache.set(url, fallbackUrl);
          await replaceURL(url, fallbackUrl, filePath);
        } else {
          failedUrls.add(url);
          console.error(
            `Fallback asset url: ${fallbackUrl}  failed with status ${fallbackStatus}`,
          );
        }
      } else {
        failedUrls.add(url);
      }
    }

    processedFiles.add(filePath);
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    throw error;
  }
}

async function processFiles(files) {
  const batches = [];
  for (let i = 0; i < files.length; i += CONFIG.BATCH_SIZE) {
    batches.push(files.slice(i, i + CONFIG.BATCH_SIZE));
  }

  let processed = 0;
  for (const batch of batches) {
    await Promise.all(
      batch.map((file) =>
        processFile(file).catch((error) => {
          console.error(`Error processing file ${file}:`, error);
        }),
      ),
    );
    processed += batch.length;
    console.log(`Processed ${processed}/${files.length} files`);
  }
}

async function postbuild() {
  console.time('postbuild');
  try {
    const files = await glob('**/*', {
      cwd: process.env.BUILD_DIR || '.svelte-kit/cloudflare',
      dot: true,
      absolute: true,
      filesOnly: true,
    });

    const targetFiles = files.filter(
      (file) =>
        !processedFiles.has(file) &&
        (file.endsWith('.json') || file.endsWith('.html')),
    );

    console.log(`Processing ${targetFiles.length} files...`);
    await processFiles(targetFiles);

    console.log(`Successfully processed: ${processedFiles.size} files`);
    console.log(`Failed URLs: ${failedUrls.size}`);
    console.timeEnd('postbuild');
  } catch (error) {
    console.error('Postbuild failed:', error);
    process.exit(1);
  }
}

if (process.env.PUBLIC_ADAPTER === 'STATIC') {
  postbuild().catch((error) => {
    console.error('\nScript failed:', error);
    process.exit(1);
  });
} else {
  console.log('Skipping postbuild for adapter: ' + process.env.PUBLIC_ADAPTER);
}
