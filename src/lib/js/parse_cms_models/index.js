import {gen_img_url} from '../helpers.js';
export * from './people';

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

export function projects(project) {
  const parsedProjectCard = {
    title: project.translations[0].title,
    organization:
      project.Organizations[0].Organizations_id.translations[0].name,
    subpage: project.subpage,
  };

  if (project.translations[0].summary !== null) {
    parsedProjectCard['summary'] = project.translations[0].summary;
  }

  if (project.subpage) {
    parsedProjectCard['project_id'] = project.project_id;
  }

  if (project.Local_Chapters.length > 0) {
    parsedProjectCard['correlaidx'] = project.Local_Chapters;
  }

  if (project.Podcast) {
    parsedProjectCard['podcast_href'] = project.Podcast.soundcloud_link;
  }
  for (const post of project.Posts) {
    if (post.translations.slug) {
      parsedProjectCard['post_slug'] = post.translations.slug;
      break;
    }
  }

  if (project.Projects_Outputs.length > 0) {
    parsedProjectCard['repo'] = project.Projects_Outputs[0].url;
  }

  return parsedProjectCard;
}

export function lcProjects(lcProject) {
  const project = lcProject.Projects_id;
  const parsedProjectCard = {
    title: project.translations[0].title,
    organization:
      project.Organizations[0].Organizations_id.translations[0].name,
    subpage: project.subpage,
  };

  if (project.translations[0].summary !== null) {
    parsedProjectCard['summary'] = project.translations[0].summary;
  }

  if (project.subpage) {
    parsedProjectCard['project_id'] = project.project_id;
  }

  if (project.Local_Chapters.length > 0) {
    parsedProjectCard['correlaidx'] = project.Local_Chapters;
  }

  if (project.Podcast) {
    parsedProjectCard['podcast_href'] = project.Podcast.soundcloud_link;
  }
  if (project.Posts.length > 0) {
    parsedProjectCard['post_slug'] =
      project.Posts[0].Posts_id.translations[0].slug;
  }
  if (project.Projects_Outputs.length > 0) {
    parsedProjectCard['repo'] = project.Projects_Outputs[0].url;
  }

  return parsedProjectCard;
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
