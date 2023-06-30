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

/**
 * Extracts local chapter names from a raw subelement array and adds them to the parsed element.
 *
 * @param {object} parsedElement - The element to which the local chapter names should be added.
 * @param {Array} lcSbuElementsRaw - The raw subelement array.
 * @param {string} entryName - The name of the entry in the parsed element.
 *   Defaults to 'correlaidx'.
 */
function parseLcSubElements(
  parsedElement,
  lcSbuElementsRaw,
  entryName = 'correlaidx',
) {
  if (lcSbuElementsRaw.length > 0) {
    parsedElement[entryName] = lcSbuElementsRaw.map((lc) => {
      if (typeof lc.Local_Chapters_id.translations[0].city !== 'string') {
        throw new Error('Local chapter name is missing or not a string');
      }
      return lc.Local_Chapters_id.translations[0].city;
    });
  }
}

export function events(event) {
  const parsedEvent = {
    slug: event.slug,
    title: event.title,
    teaser: event.teaser,
    date: new Date(event.date),
    tags: event.tags,
    language: event.language,
  };
  if (event.end_date) {
    parsedEvent['end_date'] = new Date(event.end_date);
  }

  parseLcSubElements(parsedEvent, event.local_chapters);

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
  const status = project.status;

  const parsedProjectCard = {
    title: project.translations[0].title,
    isInternal: project.is_internal,
    subpage: project.subpage,
  };

  if (!project.is_internal) {
    parsedProjectCard['organization'] =
      project.Organizations[0].Organizations_id.translations[0].name;
  }

  if (project.translations[0].summary !== null) {
    parsedProjectCard['summary'] = project.translations[0].summary;
  }

  if (project.subpage) {
    parsedProjectCard['project_id'] = project.project_id;
  }

  parseLcSubElements(parsedProjectCard, project.Local_Chapters);

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
    const repo = project.Projects_Outputs.find(
      (obj) => obj.output_type === 'repository',
    );
    if (repo) {
      parsedProjectCard['repo'] = repo.url;
    }
  }

  function anonymizeProjectCard(parsedProjectCard) {
    const anonymizedProjectCard = {};

    anonymizedProjectCard['title'] = parsedProjectCard['title'];
    anonymizedProjectCard['subpage'] = parsedProjectCard['subpage'];

    // This is expected to be always False for anonymized projects
    // as there should normally no reason to anonymize an internal projects.
    // However, if we want to anonymize an internal project, we can have to
    // explicitly overwrite this value because otherwise the different layout
    // of internal projects would be used negating the anonymity
    anonymizedProjectCard['isInternal'] = false;

    for (const field of ['summary', 'project_id', 'correlaidx']) {
      if (field in parsedProjectCard) {
        anonymizedProjectCard[field] = parsedProjectCard[field];
      }
    }

    return anonymizedProjectCard;
  }

  if (status === 'published_anon') {
    return anonymizeProjectCard(parsedProjectCard);
  } else {
    return parsedProjectCard;
  }
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
    parsedProjectCard['correlaidx'] = project.Local_Chapters.map((lc) => {
      if (typeof lc.Local_Chapters_id.translations[0].city !== 'string') {
        throw new Error('Local chapter name is missing or not a string');
      }
      return lc.Local_Chapters_id.translations[0].city;
    });
  }

  if (project.Podcast) {
    parsedProjectCard['podcast_href'] = project.Podcast.soundcloud_link;
  }
  if (project.Posts.length > 0) {
    parsedProjectCard['post_slug'] =
      project.Posts[0].Posts_id.translations[0].slug;
  }
  if (project.Projects_Outputs.length > 0) {
    const repo = project.Projects_Outputs.find(
      (obj) => obj.output_type === 'repository',
    );
    if (repo) {
      parsedProjectCard['repo'] = repo.url;
    }
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
