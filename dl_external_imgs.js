import glob from 'tiny-glob';
import {createWriteStream} from 'fs';
import {mkdir} from 'node:fs/promises';
import {readFile, writeFile} from 'fs/promises';
import * as url from 'url';
import * as https from 'https';
import path from 'node:path';
import dotenv from 'dotenv';

// load environment variables
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}.local`),
});
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});
dotenv.config({path: path.resolve(process.cwd(), '.env.local')});
dotenv.config({path: path.resolve(process.cwd(), '.env')});

const URL = `${process.env.PUBLIC_API_URL}/assets`;

const buildDirectory = process.env.BUILD_DIR || '.svelte-kit/cloudflare';
const newAssetsDirectory = buildDirectory + '/assets';

async function postbuild() {
  await mkdir(newAssetsDirectory, {recursive: true});

  console.log('Starting replacement of files from external sources');

  // getting all files in build directory
  const files = await glob('**/*', {
    cwd: buildDirectory,
    dot: true,
    absolute: true,
    filesOnly: true,
  });

  const concurrencyLimit = 10;

  // Create an array of promises for file processing
  const filePromises = files.map(async (file, index) => {
    // if file is json or html
    if (file.endsWith('.json') || file.endsWith('.html')) {
      const fileContent = await readFile(file, 'utf8');
      await processFile(file, fileContent);
    }
  });

  // Execute file processing promises with concurrency limit
  const concurrentPromises = [];
  for (let i = 0; i < filePromises.length; i += concurrencyLimit) {
    const batchPromises = filePromises.slice(i, i + concurrencyLimit);
    concurrentPromises.push(Promise.all(batchPromises));
  }

  Promise.all(concurrentPromises)
    .then(() => {
      console.log('All file processing completed');
      process.exit();
    })
    .catch((error) => {
      console.error('Error during file processing:', error);
      process.exit(1); // Exit with a non-zero status code to indicate an error
    });

  console.log('Done with replacement of files from external sources');
}

async function processFile(filePath, fileContent) {
  // find all file Urls
  const Urls = await findUrls(fileContent, filePath);
  // iterates over the file URLs found in the fileContent string, downloads each file, and performs URL replacements in the filePath
  if (Urls.length > 0) {
    console.log(`Found ${Urls.length} urls in ${filePath}`);
    for (let UrlIndex = 0; UrlIndex < Urls.length; UrlIndex++) {
      const Url = Urls[UrlIndex]['url'];
      const type = Urls[UrlIndex]['type'];

      // this line replaces all occurrences of forward slashes (/) and the url query
      const cleanedUrl = Url.replace(/\\u002F/g, '/').split('?')[0];

      // generating the path to the file
      // (specifies where the file is downloaded to)
      let Path;
      if (type == 'image') {
        Path =
          cleanedUrl.replace(URL, `${process.cwd()}/${newAssetsDirectory}`) +
          '.webp';
      } else {
        Path =
          cleanedUrl.replace(URL, `${process.cwd()}/${newAssetsDirectory}`) +
          '.pdf';
      }
      await downloadFile(Url, Path);

      // this will replace the  url in the file content
      Path = Path.replace(`${process.cwd()}/${buildDirectory}`, '');
      if (!Path.startsWith('/assets')) {
        Path = Path.substring(Path.indexOf('/'));
      }
      await replaceURL(Url, Path, filePath);
    }
  }
}

async function findUrls(fileContent, filePath) {
  let UrlRegexString = URL.replace(/\//g, '(?:\\/|\\\\u002F)');

  // Match file URLs in a string, including URLs in href attributes and URLs inside url() function.
  // should match both url() and src: while not matching backslashes (used in json files right after url to escape qoute)
  UrlRegexString = `${UrlRegexString}(?:[^"\\s\\\\)]*)`;
  const UrlRegex = new RegExp(UrlRegexString, 'g');

  // iterates over the fileContent string using the exec method and extracts all the matched file URLs
  const Urls = [];
  let url;
  let matchedUrl;
  let retryCount = 0;
  const maxRetries = 3;

  const retryOnTimeout = async (url) => {
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error(`Request for ${url} timed out`));
      }, 15000);
    });

    try {
      const response = await Promise.race([fetch(url), timeoutPromise]);
      const contentType = response.headers.get('Content-Type');
      if (contentType.includes('image')) {
        console.log(`${url} is an image`);
        throw new Error(`Unhandled Image: ${url} in ${filePath}`);
      } else if (contentType.includes('pdf')) {
        console.log(`${url} is a pdf`);
        Urls.push({url: url, type: 'pdf'});
      } else if (contentType.includes('application/json')) {
        throw new Error(`API may be under pressure`);
      } else {
        throw new Error(`Unhandled type ${contentType}: ${url} in ${filePath}`);
      }
    } catch (error) {
      console.error('Error:', error);
      // Retry the request only if it is a timeout error and the maximum number of retries has not been reached
      if (
        error.message === `Request for ${url} timed out` ||
        error.message === `API may be under pressure`
      ) {
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(`Retrying request for ${url}`);
          return retryOnTimeout(url);
        } else {
          console.log(`Max retry count reached for ${url}`);
          throw error;
        }
      } else {
        throw error;
      }
    }
  };

  while ((matchedUrl = UrlRegex.exec(fileContent))) {
    url = matchedUrl[0];
    // as all file contain this, we can use it to exclude pdf
    if (url.includes('format=webp')) {
      Urls.push({url: url, type: 'image'});
    } else {
      console.log(`may be a pdf:  ${url}`);
      // Call the retryOnTimeout function
      await retryOnTimeout(url);
    }
  }

  return Urls;
}

async function downloadFile(Url, Path) {
  // opening the file in write mode
  const file = createWriteStream(Path);

  // downloading the file
  const q = url.parse(Url, true);
  const options = {
    hostname: q.hostname,
    port: q.port,
    path: q.pathname + q.search,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    });

    req.on('error', (err) => {
      fs.unlink(buildPath, () => {});
      reject(err);
    });

    req.end();
  });
}

async function replaceURL(Url, Path, filePath) {
  // read the file content
  const fileContent = await readFile(filePath, 'utf8');

  // replace the file Url with the file Path
  const newFileContent = fileContent.replace(Url, Path);

  // write the new file content
  await writeFile(filePath, newFileContent);
}

if (process.env.PUBLIC_ADAPTER === 'STATIC') {
  postbuild();
} else {
  console.log('Skipping postbuild for adapter: ' + process.env.PUBLIC_ADAPTER);
}

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Promise Rejection:', error);
  process.exit(1); // Exit with a non-zero status code to indicate an error
});
