import {gen_img_url, processHtml} from '../helpers.js';
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
    gradient_only: section.item.gradient_only,
    buttons: parseHeroButtons(section.item.buttons),
  };
  if (section.item.image) {
    heroParams['image'] = gen_img_url(section.item.image.id);
    heroParams['image_desc'] = section.item.image.description;
    heroParams['image_alt'] = section.item.translations[0].image_alt;
  }
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
    parsedHero['image'] = gen_img_url(local_chapter.hero_image.id);
    parsedHero['image_desc'] = local_chapter.hero_image.description;
  }

  return parsedHero;
}

function parseCarouselHero() {
  const parsedHero = {
    image: gen_img_url(element.carousel_element_id.hero.image.id),
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
export function cta_groups(section) {
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
export function quote_carousels(section) {
  // loop over quotes
  const quotes = [];
  for (const quote of section.item.quotes) {
    const temp = {
      text: quote.quotes_id.translations[0].text,
      subtitle: quote.quotes_id.translations[0].subtitle,
    };
    if (!section.item.text_only) {
      temp.image = gen_img_url(quote.quotes_id.image.id);
      temp.image_desc = quote.quotes_id.image.description;
    }
    quotes.push(temp);
  }
  return {
    quotes: quotes,
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
    image_desc: award.image.description,
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
