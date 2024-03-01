import {gemImgUrl} from '../helpers.js';
export * from './people';
export * from './cards';

export function lcHeros(localChapter) {
  const parsedHero = {
    gradientOnly: !localChapter.hero_image,
    height: 'half',
    correlaidx: true,
    text: `${localChapter.translations[0].city}`,
    imageAlt: localChapter.translations[0].hero_image_alt,
  };

  if (localChapter.hero_image) {
    parsedHero['image'] = gemImgUrl(localChapter.hero_image.id);
    parsedHero['imageDesc'] = localChapter.hero_image.description;
  }

  return parsedHero;
}

export function awards(award) {
  return {
    year: award.year,
    image: gemImgUrl(
      award.image.id,
      'fit=cover&width=392&height=240&quality=80',
    ),
    imageDesc: award.image.description,
    alt: award.translations[0].image_alt,
    title: award.translations[0].title,
  };
}

export function partners(partner) {
  const img = gemImgUrl(partner.logo.id, 'fit=cover&quality=100');
  return {
    name: partner.name,
    img: img,
    description: partner.translations[0].description,
    website: partner.link,
  };
}
