import {gen_img_url} from '../helpers.js';
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
    image: section.item.image,
    text: section.item.translations[0].text,
    image_alt: section.item.translations[0].image_alt,
    image_desc: section.item.image.description,
    height: section.item.height,
    gradient_only: section.item.gradient_only,
    buttons: parseHeroButtons(section.item.buttons),
  };
  return heroParams;
}

export function lcHeros(local_chapter) {
  const parsedHero = {
    gradient_only: !local_chapter.hero_image,
    height: 'half',
    correlaidx: true,
    text: `${local_chapter.translations[0].city}`,
    image_alt: local_chapter.translations[0].hero_image_alt,
  };

  if (local_chapter.hero_image) {
    parsedHero['image'] = local_chapter.hero_image;
    parsedHero['image_desc'] = local_chapter.hero_image.description;
  }

  return parsedHero;
}

function parseCarouselHero() {
  const parsedHero = {
    image: element.carousel_element_id.hero.image,
    image_desc: element.carousel_element_id.hero.image.description,
    text: element.carousel_element_id.hero.translations[0].text,
    height: element.carousel_element_id.hero.height,
    gradient_only: element.carousel_element_id.hero.gradient_only,
    buttons: element.carousel_element_id.hero.buttons,
  };
  return parsedHero;
}

export function ctas(section) {
  const ctaParams = {
    button_link: section.item.button.translations[0].link,
    button_color: section.item.button.translations[0].text,
    button_text: section.item.button.color,
    text: section.item.translations[0].text,
  };
  return ctaParams;
}
export function cta_group(section) {
  const ctas = [];
  for (const ctaRaw of section.item.ctas) {
    const cta = {
      button_link: ctaRaw.ctas_id.button.translations[0].link,
      button_text: ctaRaw.ctas_id.button.translations[0].text,
      button_color: ctaRaw.ctas_id.button.color,
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
    source: section.item.translations[0].content,
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
export function quote_carousel(section) {
  return {
    quotes: section.item.quotes,
    text_only: section.item.text_only,
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
    icon_type: section.item.icon_type,
    text: section.item.translations[0].text,
  };
}

export function awards(award) {
  return {
    year: award.year,
    image: gen_img_url(
      award.image.id,
      'fit=cover&width=392&height=240&quality=80',
    ),
    alt: award.translations[0].image_alt,
    title: award.translations[0].title,
  };
}

export function partners(partner) {
  const img = gen_img_url(partner.logo.id, 'fit=cover&quality=100');
  return {
    name: partner.name,
    img: img,
    description: partner.translations[0].description,
    website: partner.link,
  };
}

export function custom_sections(section) {
  return;
}
