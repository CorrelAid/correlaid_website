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
const newAssetsDirectory = '.svelte-kit/cloudflare/img';

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

  // loopover the files and process them
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    // get content of file
    const fileContent = await readFile(file, 'utf8');
    await processFile(file, fileContent);
  }
  console.log('Done with replacement of images from external sources');
}

async function processFile(filePath, fileContent) {
  // find all image Urls
  const imageUrls = await findImageUrls(fileContent);

  // iterates over the image URLs found in the fileContent string, downloads each image, and performs URL replacements in the filePath
  if (imageUrls.length > 0) {
    console.log(`Downloading images for file: ${filePath}`);
    for (
      let imageUrlIndex = 0;
      imageUrlIndex < imageUrls.length;
      imageUrlIndex++
    ) {
      const imageUrl = imageUrls[imageUrlIndex];

      // this line replaces all occurrences of forward slashes (/)
      const cleanedImageUrl = imageUrl.replace(/\\u002F/g, '/');

      // generating the path to the image
      // (this will replace the image url in the file content and specifies where the image is downloaded to)
      const imagePath =
        cleanedImageUrl.replace(URL, `${process.cwd()}/${newAssetsDirectory}`) +
        '.png';

      await downloadImageFile(imageUrl, imagePath);
      await replaceURL(imageUrl, imagePath, filePath);
    }
  }
}

async function findImageUrls(fileContent) {
  //  This line replaces all occurrences of forward slashes (/)
  let imageUrlRegexString = URL.replace(/\//g, '(?:\\/|\\\\u002F)');

  // match image URLs in a string, excluding URLs that are part of href attributes in anchor tags.
  imageUrlRegexString = `(?![^\\s?]*(?:href="))${imageUrlRegexString}(?:[^"\\s]*)`;
  const imageUrlRegex = new RegExp(imageUrlRegexString, 'g');

  // iterates over the fileContent string using the exec method and extracts all the matched image URLs
  const imageUrls = [];
  let imageUrl;
  while ((imageUrl = imageUrlRegex.exec(fileContent))) {
    imageUrl = imageUrl[0];
    imageUrls.push(imageUrl);
  }
  return imageUrls;
}

async function downloadImageFile(imageUrl, imagePath) {
  // opening the file in write mode
  const file = createWriteStream(imagePath);

  console.log(`Downloading image: ${imageUrl}`);

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
  console.log(`Replacing url for fule: ${filePath}`);
  // read the file content
  const fileContent = await readFile(filePath, 'utf8');

  // replace the imageUrl with the imagePath
  const newFileContent = fileContent.replace(imageUrl, imagePath);

  // write the new file content
  await writeFile(filePath, newFileContent);
}
