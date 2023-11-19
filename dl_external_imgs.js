import glob from 'tiny-glob';
import {createWriteStream} from 'fs';
import {mkdir} from 'node:fs/promises';
import {readFile, writeFile} from 'fs/promises';
import * as url from 'url';
import * as https from 'https';
import path from 'node:path';
import dotenv from 'dotenv';

// Mimic vites loading order using the dotenv default overwrite = false
// This means preexisting env vars have highest priority followed by
// env specific vars general env vars
// .local versions of the variables always overwrite their non-local
// counterpart
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}.local`),
});
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});
dotenv.config({path: path.resolve(process.cwd(), '.env.local')});
dotenv.config({path: path.resolve(process.cwd(), '.env')});

const URL = `${process.env.PUBLIC_API_URL}/assets`;

async function postbuild() {
  const originUrls = [URL];
  const pagesDirectory = '.svelte-kit/cloudflare'; // Replace with your pages directory
  const newAssetsDirectory = '.svelte-kit/cloudflare/img'; // Replace with your assets directory

  await mkdir(newAssetsDirectory, {recursive: true});

  console.log('Starting replacement of images from external sources');
  if (typeof originUrls === 'string') {
    originUrls = [originUrls];
  }
  const files = await glob('**/*', {
    cwd: pagesDirectory,
    dot: true,
    absolute: true,
    filesOnly: true,
  });

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const fileContent = await readFile(file, 'utf8');
    await downloadImageFiles(file, fileContent, newAssetsDirectory, originUrls);
  }
  console.log('Done with replacement of images from external sources');
}

async function downloadImageFiles(
  filePath,
  fileContent,
  newAssetsDirectory,
  originUrls,
) {
  for (let index = 0; index < originUrls.length; index++) {
    const originUrl = originUrls[index];
    const Urls = await findImageUrls(fileContent, originUrl);
    const imageUrls = Urls.imageUrls;
    const pngUrls = Urls.pngUrls;
    if (imageUrls.length > 0) {
      console.log(`Downloading images for file: ${filePath}`);
      for (
        let imageUrlIndex = 0;
        imageUrlIndex < imageUrls.length;
        imageUrlIndex++
      ) {
        const imageUrl = imageUrls[imageUrlIndex];
        const pngUrl = pngUrls[imageUrlIndex];
        const cleanedImageUrl = imageUrl.replace(/\\u002F/g, '/');
        const buildImagePath =
          cleanedImageUrl.replace(
            originUrl,
            `${process.cwd()}/${newAssetsDirectory}`,
          ) + '.png';
        const ImagePath = cleanedImageUrl.replace(originUrl, `/img`) + '.png';
        // const buildImagePathArray = buildImagePath.split("/");
        // const fileName = buildImagePathArray[buildImagePathArray.length - 1];
        await downloadImageFile(pngUrl, buildImagePath);
        await replaceURL(imageUrl, ImagePath, filePath);
      }
    }
  }
}

async function findImageUrls(fileContent, originUrl) {
  let imageUrlRegexString = originUrl.replace(/\//g, '(?:\\/|\\\\u002F)');
  imageUrlRegexString = `(?![^\\s?]*(?:href="))${imageUrlRegexString}(?:[^"\\s]*)`;
  const imageUrlRegex = new RegExp(imageUrlRegexString, 'g');
  const imageUrls = [];
  const pngUrls = [];
  let imageUrl;
  let pngUrl;
  while ((imageUrl = imageUrlRegex.exec(fileContent))) {
    imageUrl = imageUrl[0];
    pngUrl = imageUrl[0] + '&format=png';
    pngUrl = imageUrl.replace('/&', '&').replace('\\&', '&');
    imageUrls.push(imageUrl);
    pngUrls.push(pngUrl);
  }
  return {imageUrls: imageUrls, pngUrls: pngUrls};
}

async function downloadImageFile(imageUrl, buildImagePath) {
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
  const file = createWriteStream(buildImagePath);
  console.log(`Downloading image: ${imageUrl}`);

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

async function replaceURL(imageUrl, ImagePath, filePath) {
  console.log(`Replacing urla for fule: ${filePath}`);
  const fileContent = await readFile(filePath, 'utf8');
  console.log(imageUrl);

  const newFileContent = fileContent.replace(imageUrl, ImagePath);
  await writeFile(filePath, newFileContent);
}
