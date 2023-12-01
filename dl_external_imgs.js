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

const buildDirectory = '.svelte-kit/cloudflare';
const newAssetsDirectory = buildDirectory + '/img';

async function postbuild() {
  await mkdir(newAssetsDirectory, {recursive: true});

  console.log('Starting replacement of images from external sources');

  // getting all files in build directory
  const files = await glob('**/*', {
    cwd: buildDirectory,
    dot: true,
    absolute: true,
    filesOnly: true,
  });

  // Create an array of promises for file processing
  const filePromises = files.map(async (file, index) => {
    const fileContent = await readFile(file, 'utf8');
    const printMsg = `Processing file ${index + 1} of ${files.length}`;
    await processFile(file, fileContent, printMsg);
  });

  // Execute file processing promises in parallel
  await Promise.all(filePromises);

  console.log('Done with replacement of images from external sources');
}

async function processFile(filePath, fileContent, printMsg) {
  console.log(printMsg);
  // find all image Urls
  const imageUrls = await findImageUrls(fileContent);

  // iterates over the image URLs found in the fileContent string, downloads each image, and performs URL replacements in the filePath
  if (imageUrls.length > 0) {
    for (
      let imageUrlIndex = 0;
      imageUrlIndex < imageUrls.length;
      imageUrlIndex++
    ) {
      const imageUrl = imageUrls[imageUrlIndex];

      // this line replaces all occurrences of forward slashes (/) and the url query
      const cleanedImageUrl = imageUrl.replace(/\\u002F/g, '/').split('?')[0];

      // generating the path to the image
      // (specifies where the image is downloaded to)
      let imagePath =
        cleanedImageUrl.replace(URL, `${process.cwd()}/${newAssetsDirectory}`) +
        '.webp';

      await downloadImageFile(imageUrl, imagePath);

      // this will replace the image url in the file content
      imagePath = imagePath.replace(`${process.cwd()}/${buildDirectory}`, '');
      if (!imagePath.startsWith('/img')) {
        imagePath = imagePath.substring(imagePath.indexOf('/'));
      }
      await replaceURL(imageUrl, imagePath, filePath);
    }
  }
}

async function findImageUrls(fileContent) {
  let imageUrlRegexString = URL.replace(/\//g, '(?:\\/|\\\\u002F)');

  // Match image URLs in a string, including URLs in href attributes and URLs inside url() function.
  // should match both url() and src: while not matching backslashes (used in json files right after url to escape qoute)
  imageUrlRegexString = `${imageUrlRegexString}(?:[^"\\s\\\\)]*)`;
  const imageUrlRegex = new RegExp(imageUrlRegexString, 'g');

  // iterates over the fileContent string using the exec method and extracts all the matched image URLs
  const imageUrls = [];
  let imageUrl;
  while ((imageUrl = imageUrlRegex.exec(fileContent))) {
    imageUrl = imageUrl[0];
    // as all image contain this, we can use it to exclude pdf
    if (imageUrl.includes('format=webp') || imageUrl.includes('width=')) {
      imageUrls.push(imageUrl);
    } else console.log('Skipping: ' + imageUrl);
  }
  return imageUrls;
}

async function downloadImageFile(imageUrl, imagePath) {
  // opening the file in write mode
  const file = createWriteStream(imagePath);

  // downloading the image
  const q = url.parse(imageUrl, true);
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
      fs.unlink(buildImagePath, () => {});
      reject(err);
    });

    req.end();
  });
}

if (process.env.PUBLIC_ADAPTER === 'STATIC') {
  postbuild();
} else {
  console.log('Skipping postbuild for adapter: ' + process.env.PUBLIC_ADAPTER);
}

async function replaceURL(imageUrl, imagePath, filePath) {
  // read the file content
  const fileContent = await readFile(filePath, 'utf8');

  // replace the imageUrl with the imagePath
  const newFileContent = fileContent.replace(imageUrl, imagePath);

  console.log('replaced: ' + imageUrl + ' with: ' + imagePath);

  // write the new file content
  await writeFile(filePath, newFileContent);
}
