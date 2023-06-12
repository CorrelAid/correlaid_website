import {gen_img_url} from '../helpers.js';

export function blog_posts(post) {
  let imageUrl;
  let imageDesc;
  if (post.title_image) {
    imageUrl = gen_img_url(post.title_image.id);
    imageDesc = post.title_image.description;
  }

  return {
    langs: post.langs,
    pubdate: post.pubdate,
    slug: post.translations.slug,
    image_alt: post.translations.image_alt,
    title: post.translations.title,
    teaser: post.translations.teaser,
    image_url: imageUrl,
    image_desc: imageDesc,
    content_creators: post.content_creators,
  };
}
export function events(event) {
  const parsedEvent = {
    slug: event.slug,
    title: event.title,
    teaser: event.teaser,
    date: new Date(event.date),
    tags: event.tags,
    type: event.type,
    language: event.language,
    local_chapters: event.local_chapters,
  };
  if (event.end_date) {
    parsedEvent['end_date'] = new Date(event.end_date);
  }
  return parsedEvent;
}
export function podcast_episodes(episode) {
  const parsedEpisode = {
    langs: [episode.language],
    pubdate: episode.publication_datetime,
    href: episode.soundcloud_link,
    title: episode.title,
    teaser: episode.description,
    content_creators: episode.content_creators,
    image_alt: episode.image_alt,
  };
  if (episode.image) {
    parsedEpisode['image_url'] = gen_img_url(episode.image.id);
  }
  return parsedEpisode;
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

export function workshops(workshop) {
  const parsedWorkshop = {
    title: workshop.name,
    subtitle: workshop.teaser,
    language: workshop.language,
    href: workshop.resource_link,
    resp_unit: workshop.responsible_unit,
    tags: workshop.tags,
  };
  if (workshop.local_chapters[0]) {
    // TODO: This is used inside the WorkshopCard component to define the href to the workshop.
    // Can this really be missing?
    parsedWorkshop['correlaidx_city'] =
      workshop.local_chapters[0].Local_Chapters_id.translations[0].city;
  }
  return parsedWorkshop;
}
