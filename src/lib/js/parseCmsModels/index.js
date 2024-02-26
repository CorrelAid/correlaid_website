import {gemImgUrl, processHtml} from '../helpers.js';
export * from './people';
export * from './cards';

function parseHeroButtons(buttons) {
  const parsedButtons = [];
  for (const button of buttons) {
    parsedButtons.push({
      text: button.buttons_id.translations[0].text,
      href: button.buttons_id.translations[0].link,
      color: `bg-${button.buttons_id.color}`,
    });
  }
  return parsedButtons;
}

export function heros(section) {
  const heroParams = {
    text: section.item.translations[0].text,
    height: section.item.height,
    gradientOnly: section.item.gradient_only,
    buttons: parseHeroButtons(section.item.buttons),
  };
  if (section.item.image) {
    heroParams['image'] = gemImgUrl(section.item.image.id);
    heroParams['imageDesc'] = section.item.image.description;
    heroParams['imageAlt'] = section.item.translations[0].image_alt;
  }
  return heroParams;
}

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

function parseCarouselHero() {
  const parsedHero = {
    image: gemImgUrl(element.carousel_element_id.hero.image.id),
    imageDesc: element.carousel_element_id.hero.image.description,
    text: element.carousel_element_id.hero.translations[0].text,
    height: element.carousel_element_id.hero.height,
    gradientOnly: element.carousel_element_id.hero.gradient_only,
    buttons: element.carousel_element_id.hero.buttons,
  };
  return parsedHero;
}

export function ctas(section) {
  const ctaParams = {
    buttonLink: section.item.button.translations[0].link,
    buttonColor: section.item.button.translations[0].text,
    buttonText: section.item.button.color,
    text: section.item.translations[0].text,
  };
  return ctaParams;
}
export function ctaGroups(section) {
  const ctas = [];
  for (const ctaRaw of section.item.ctas) {
    const cta = {
      buttonLink: ctaRaw.ctas_id.button.translations[0].link,
      buttonText: ctaRaw.ctas_id.button.translations[0].text,
      buttonColor: ctaRaw.ctas_id.button.color,
      text: ctaRaw.ctas_id.translations[0].text,
    };
    ctas.push(cta);
  }
  return {ctas: ctas};
}
export function timelines(section) {
  const timelineParams = {
    steps: section.item.steps,
    color: section.item.color,
  };
  return timelineParams;
}
export function wysiwyg(section) {
  return {
    source: processHtml(section.item.translations[0].content),
    options: '',
  };
}
export function carousel(section) {
  const elements = JSON.parse(JSON.stringify(section.item.carousel_elements));
  for (const element of elements) {
    element['hero'] = parseCarouselHero(element);
  }
  return {
    carousel_elements: elements,
  };
}
export function quoteCarousels(section) {
  // loop over quotes
  const quotes = [];
  for (const quote of section.item.quotes) {
    const temp = {
      text: quote.quotes_id.translations[0].text,
      subtitle: quote.quotes_id.translations[0].subtitle,
    };
    if (!section.item.text_only) {
      temp.image = gemImgUrl(quote.quotes_id.image.id);
      temp.imageDesc = quote.quotes_id.image.description;
    }
    quotes.push(temp);
  }
  return {
    quotes: quotes,
    textOnly: section.item.text_only,
  };
}
export function buttons(section) {
  return {
    href: section.item.translations[0].link,
    text: section.item.translations[0].text,
    color: `bg-${section.item.color}`,
  };
}
export function icons(section) {
  return {
    iconType: section.item.correlaidXShortId,
    text: section.item.translations[0].text,
  };
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

export function customSections(section) {
  return;
}
