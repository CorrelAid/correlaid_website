import {gemImgUrl, getTranslation, getLang} from '../helpers.js';
import _ from 'lodash';
import translations from '$lib/data/translations.js';

export function blogPosts(post) {
  let imageUrl;
  let imageDesc;
  if (post.title_image) {
    imageUrl = gemImgUrl(post.title_image.id);
    imageDesc = post.title_image.description;
  }
  return {
    langs: post.langs,
    pubdate: post.publication_datetime,
    slug: post.translations.slug,
    imageAlt: post.translations.image_alt,
    title: post.translations.title,
    teaser: post.translations.teaser,
    imageUrl: imageUrl,
    imageDesc: imageDesc,
    contentCreators: post.content_creators,
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
  parsedElement[entryName] = lcSbuElementsRaw.map((lc) => {
    if (typeof lc.Local_Chapters_id.translations[0].city !== 'string') {
      throw new Error('Local chapter name is missing or not a string');
    }
    return lc.Local_Chapters_id.translations[0].city;
  });
  parsedElement['correlaidXShortId'] = lcSbuElementsRaw.map((lc) => {
    return lc.Local_Chapters_id.short_id;
  });
}

export function events(event, ical = false) {
  const parsedEvent = {
    slug: event.slug,
    title: event.title,
    teaser: event.teaser,
    date: new Date(event.date),
    tags: event.tags,
    type: event.type,
    language: event.language,
  };

  if (ical) {
    parsedEvent['date'] = event.date;
    if (event.end_date) {
      parsedEvent['endDate'] = event.end_date;
    }
    if (event.startTime) {
      parsedEvent['startTime'] = event.start_time;
    }
    if (event.end_time) {
      parsedEvent['endTime'] = event.end_time;
    }
    parsedEvent['id'] = event.id;
  } else {
    parseLcSubElements(parsedEvent, event.local_chapters);
    parsedEvent['date'] = new Date(event.date);
    if (event.end_date) {
      parsedEvent['endDate'] = new Date(event.end_date);
    }
  }

  return parsedEvent;
}

export function icalEvents(event) {
  return events(event, true);
}

export function podcastEpisodes(episode) {
  const parsedEpisode = {
    langs: [episode.language],
    pubdate: episode.publication_datetime,
    href: episode.soundcloud_link,
    title: episode.title,
    teaser: episode.description,
    contentCreators: episode.content_creators,
    imageAlt: episode.image_alt,
  };
  if (episode.image) {
    parsedEpisode['imageUrl'] = gemImgUrl(episode.image.id);
  }
  return parsedEpisode;
}

function anonymizeProjectCard(parsedProjectCard, lang) {
  const anonymizedProjectCard = {};
  anonymizedProjectCard['title'] = parsedProjectCard['title'];
  anonymizedProjectCard['subpage'] = parsedProjectCard['subpage'];
  if (lang === 'de-DE') {
    anonymizedProjectCard['organization'] =
      translations['de']['organization.anonymous'].text;
  } else {
    anonymizedProjectCard['organization'] =
      translations['en']['organization.anonymous'].text;
  }

  // This is expected to be always False for anonymized projects
  // as there should normally no reason to anonymize an internal projects.
  // However, if we want to anonymize an internal project, we can have to
  // explicitly overwrite this value because otherwise the different layout
  // of internal projects would be used negating the anonymity
  anonymizedProjectCard['isInternal'] = false;

  for (const field of [
    'summary',
    'projectId',
    'correlaidx',
    'correlaidXShortId',
    'type',
    'data',
  ]) {
    if (field in parsedProjectCard) {
      anonymizedProjectCard[field] = parsedProjectCard[field];
    }
  }

  return anonymizedProjectCard;
}

export function projects(project, params) {
  const status = project.status;
  const lang = project.translations[0].languages_code.code;

  const parsedProjectCard = {
    title: project.translations[0].title,
    isInternal: project.is_internal,
    subpage: project.subpage,
  };

  if (project.translations[0].type) {
    parsedProjectCard['type'] = project.translations[0]['type'].map((str) =>
      str.replace('_', ' ').toLowerCase(),
    );
  }

  if (project.translations[0].data) {
    if (!_.isEmpty(project.translations[0].data)) {
      parsedProjectCard['data'] = project.translations[0].data.map((str) =>
        str.replace('_', ' ').toLowerCase(),
      );
    }
  }

  if (
    project.end_date !== null &&
    project.end_date !== '' &&
    project.end_date !== undefined
  ) {
    parsedProjectCard['endDate'] = new Date(project.end_date);
  } else {
    if (project.end_date_predicted === undefined) {
      throw new Error('end_date_predicted is undefined');
    }
    parsedProjectCard['endDate'] = new Date(project.end_date_predicted);
  }

  if (
    !project.is_internal &&
    project.status !== 'published_anon' &&
    project.status !== 'preview_anon'
  ) {
    parsedProjectCard['organization'] =
      project.Organizations[0].Organizations_id.translations[0].name;
    parsedProjectCard['organization_sector'] =
      project.Organizations[0].Organizations_id.sector;
  }

  if (project.is_internal) {
    if (lang === 'de-DE') {
      parsedProjectCard['organization'] =
        translations['de']['organization.internalProject'].text;
    } else {
      parsedProjectCard['organization'] =
        translations['en']['organization.internalProject'].text;
    }
  }

  if (project.translations[0].summary !== null) {
    parsedProjectCard['summary'] = project.translations[0].summary;
  }

  if (project.subpage) {
    parsedProjectCard['projectId'] = project.project_id;
  }

  if (project.translations[0].summary !== null) {
    parsedProjectCard['summary'] = project.translations[0].summary;
  }

  parseLcSubElements(parsedProjectCard, project.Local_Chapters);

  if (project.Podcast) {
    parsedProjectCard['podcastHref'] = project.Podcast.soundcloud_link;
  }

  const currentLanguage = getLang(params);
  for (const post of project.Blog_Posts) {
    const translation = getTranslation(post.Blog_Posts_id, currentLanguage);
    if (translation.slug) {
      parsedProjectCard['postSlug'] = translation.slug;
      break;
    }
  }

  if (project.Projects_Outputs.length > 0) {
    const outputTypes = [
      'webapp',
      'report',
      'article',
      'video',
      'project_documentation',
      'repository',
      'data',
    ];
    parsedProjectCard['projectOutputs'] = [];

    for (const outputType of outputTypes) {
      const outputs = project.Projects_Outputs.filter(
        (obj) => obj.output_type === outputType,
      );
      if (outputs && outputs.length > 0) {
        let i = 1;
        for (const output of outputs) {
          if (outputs.length > 1) {
            output['output_number'] = i;
          }
          parsedProjectCard['projectOutputs'].push(output);
          i++;
        }
      }
    }
  }

  if (status === 'published_anon' || status === 'preview_anon') {
    return anonymizeProjectCard(parsedProjectCard, lang);
  } else {
    return parsedProjectCard;
  }
}

export function lcProjects(lcProject, params) {
  return projects(lcProject.Projects_id, params);
}

export function workshops(workshop) {
  const parsedWorkshop = {
    title: workshop.name,
    teaser: workshop.teaser,
    targetAudience: workshop.target_audience,
    language: workshop.language,
    href: workshop.resource_link,
    respUnit: workshop.responsible_unit,
    tags: workshop.tags,
  };
  if (workshop.local_chapters[0]) {
    // TODO: This is used inside the WorkshopCard component to define the href to the workshop.
    // Can this really be missing?
    parsedWorkshop['correlaidXCity'] =
      workshop.local_chapters[0].Local_Chapters_id.translations[0].city;
    parsedWorkshop['correlaidXShortId'] =
      workshop.local_chapters[0].Local_Chapters_id.short_id;
  }
  return parsedWorkshop;
}

export function jobs(job) {
  const parsedJob = {
    slug: job.slug,
    title: job.translations.title,
    summary: job.translations.summary,
    type: job.type,
    fte: job.FTE,
    salary: job.salary,
    language: job.language,
    deadline: new Date(job.deadline),
    location: job.location,
  };

  if (job.tags) {
    parsedJob['tags'] = job.tags;
  }

  return parsedJob;
}