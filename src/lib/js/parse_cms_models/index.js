import {gen_img_url} from '../helpers.js';
export * from './people';
export * from './cards';

export function heros(section) {
  const heroParams = {
    image: section.item.image,
    text: section.item.translations[0].text,
    image_alt: section.item.translations[0].image_alt,
    height: section.item.height,
    gradient_only: section.item.gradient_only,
    buttons: section.item.buttons,
  };
  return heroParams;
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
  return {
    carousel_elements: section.item.carousel_elements,
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
