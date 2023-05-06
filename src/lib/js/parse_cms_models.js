import {gen_img_url} from './helpers.js';

export function heros(section) {
  const heroParams = {
    image: section.item.image,
    text: section.item.translations[0].text,
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
export function contacts(section) {
  let imageUrl;

  if (section.item.person.image) {
    imageUrl = gen_img_url(
      section.item.person.image.id,
      'fit=cover&width=200&height=200&quality=80',
    );
  }

  const pronouns = section.item.person.translations[0]
    ? section.item.person.translations[0].pronouns
    : null;

  const personParams = {
    name: section.item.person.name,
    img: imageUrl,
    email: section.item.person.email,
    position: section.item.translations[0].position,
    description: section.item.translations[0].description,
    pronouns: pronouns,
  };
  return personParams;
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
export function blog_posts(post) {
  let imageUrl;
  if (post.title_image) {
    imageUrl = gen_img_url(
      post.title_image.id,
      'fit=inside&width=1200&height=675&format=png',
    );
  }
  return {
    langs: post.langs,
    pubdate: post.pubdate,
    slug: post.translations.slug,
    title: post.translations.title,
    teaser: post.translations.teaser,
    tags: post.translations.tags,
    image_url: imageUrl,
    content_creators: post.content_creators,
  };
}
export function events(event) {
  return {
    slug: event.slug,
    title: event.title,
    teaser: event.teaser,
    date: event.date,
    tags: event.tags,
    language: event.language,
  };
}
export function podcast_episodes(episode) {
  return {
    langs: [episode.language],
    pubdate: episode.publication_datetime,
    href: episode.soundcloud_link,
    title: episode.title,
    teaser: episode.description,
    tags: episode.tags,
    content_creators: episode.content_creators,
  };
}
export function custom_sections(section) {
  return;
}
