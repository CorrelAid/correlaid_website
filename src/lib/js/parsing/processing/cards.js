import {genImageSrc} from '../../helpers.js';

import _ from 'lodash';
import {
  translate,
  transformTypes,
  transformSector,
  genWebsiteUrl,
  getTranslation,
  extractLanguages,
  getLang,
  genDate,
} from '../../helpers.js';

import {
  processContentCreators,
  processPeople,
  processOrganizations,
  processProjectOutputs,
} from './processingHelpers.js';

export function processLocalChapters(lc, locale) {
  lc = lc.Local_Chapters_id ? lc.Local_Chapters_id : lc;
  return {
    city: lc.translations[0].city,
    href: genWebsiteUrl(
      translate(locale, 'navbar.volunteering.correlaidx', {}).url,
      lc.short_id,
    ),
  };
}
export function processBlogPosts(post, locale) {
  const lang = getLang(locale);
  const parsedPost = {
    langs: extractLanguages(post),
    translation: getTranslation(post, lang),
  };
  return {
    langs: parsedPost.langs,
    href: genWebsiteUrl(
      translate(locale, 'navbar.blog', {}).url,
      parsedPost.translation.slug,
    ),
    pubDate: genDate(post.publication_datetime, locale, true),
    imageAlt: parsedPost.translation.image_alt,
    title: parsedPost.translation.title,
    teaser: parsedPost.translation.teaser,
    imageSrc: genImageSrc(post.title_image.id),
    imageDesc: post.title_image.description,
    contentCreators: processContentCreators(post.content_creators),
  };
}

export function processPodcastEpisodes(episode, locale) {
  return {
    title: episode.title,
    imageAlt: 'CorrelAid Podcast Logo',
    langs: [episode.language],
    pubDate: genDate(episode.publication_datetime, locale, true),
    href: episode.soundcloud_link,
    teaser: episode.description,
    imageSrc: episode.image ? genImageSrc(episode.image.id) : void 0,
    contentCreators: processContentCreators(episode.content_creators),
  };
}

export function processEvents(event, locale) {
  const slug = event.slug;
  const href = genWebsiteUrl(translate(locale, 'navbar.events', {}).url, slug);
  const endDate = event.end_date
    ? genDate(event.end_date, locale, true)
    : void 0;
  const procDate = genDate(event.date, locale, true);
  const id = Number(event.id);
  const allDay = false;
  const start = new Date(event.date + ' ' + event.start_time);
  const end = event.end_date
    ? new Date(event.end_date + ' ' + event.end_time)
    : new Date(event.date + ' ' + event.end_time);
  const editable = false;
  const startEditable = false;
  const durationEditable = false;

  return {
    title: event.title,
    teaser: event.teaser,
    language: event.language,
    tags: transformTypes(event.tags),
    type: transformTypes([event.type])[0],
    href,
    procDate,
    date: new Date(event.date),
    endDate: endDate,
    procLocalChapters: _.map(event.local_chapters, (lc) => {
      return processLocalChapters(lc, locale);
    }),
    localChapterNames: _.map(event.local_chapters, (lc) => {
      return lc.Local_Chapters_id.translations[0].city;
    }),
    id,
    extendedProps: {
      href,
    },
    allDay,
    start,
    end,
    editable,
    startEditable,
    durationEditable,
  };
}

export function processProjects(project, locale) {
  const lang = getLang(locale);

  const href = genWebsiteUrl(
    translate(locale, 'navbar.using_data.project_database', {}).url,
    project.project_id,
  );

  let sector = void 0;

  if (project.Organizations.length !== 0) {
    sector = project.Organizations[0].Organizations_id.sector;
    sector = transformSector(sector);
  }

  let teamSelection = void 0;

  if (project.project_status === 'team_selection') {
    teamSelection = true;
  } else {
    teamSelection = false;
  }

  let projectOutputs = [];
  if (project.Projects_Outputs) {
    if (project.Projects_Outputs.length !== 0) {
      projectOutputs = processProjectOutputs(project, locale, lang);
    }
  }

  return {
    title: project.translations[0].title,
    summary: project.translations[0].summary,
    href: href,
    teamSelection: teamSelection,
    projectTypes: transformTypes(project.translations[0].type),
    organizationSector: sector,
    dataTypes: transformTypes(project.translations[0].data),
    endDate: project.end_date
      ? new Date(project.end_date)
      : new Date(project.end_date_predicted),
    organization: processOrganizations(project, locale),
    isInternal: project.is_internal,
    procLocalChapters: _.map(project.Local_Chapters, (lc) => {
      return processLocalChapters(lc, locale);
    }),
    localChapterNames: _.map(project.Local_Chapters, (lc) => {
      return lc.Local_Chapters_id.translations[0].city;
    }),
    projectOutputs: projectOutputs,
  };
}

export function processExperts(expert) {
  const parsedExpert = processPeople(expert, false);
  parsedExpert['position'] = expert.translations[0].area_of_expertise;
  return parsedExpert;
}

export function processWorkshops(workshop, locale) {
  const procRespUnits = [];
  const respUnitNames = [];
  if (workshop.responsible_unit === 'remote_office') {
    procRespUnits.push({
      name: 'Remote Office',
      href: translate(locale, 'navbar.about.team', {}).url,
    });
    respUnitNames.push('remote_office');
  } else if (workshop.responsible_unit === 'correlaidx') {
    procRespUnits.push({
      name: 'CorrelAidX',
      href: translate(locale, 'navbar.volunteering.correlaidx', {}).url,
    });
    respUnitNames.push('correlaidx');
  } else if (workshop.local_chapters.length != 0) {
    for (const lc of workshop.local_chapters) {
      procRespUnits.push({
        name: `CorrelAidX ${lc.Local_Chapters_id.translations[0].city}`,
        href: genWebsiteUrl(
          translate(locale, 'navbar.volunteering.correlaidx', {}).url,
          lc.Local_Chapters_id.short_id,
        ),
      });
      respUnitNames.push('correlaidx_' + lc.Local_Chapters_id.short_id);
    }
  }

  return {
    href: workshop.resource_link,
    title: workshop.name,
    tags: workshop.tags,
    targetAudiences: workshop.target_audience,
    teaser: workshop.teaser,
    language: workshop.language,
    respUnitNames,
    procRespUnits,
  };
}

export function processAwards(award) {
  return {
    imageSrc: genImageSrc(award.image.id),
    imageDesc: award.image.description,
    imageAlt: award.translations[0].image_alt,
    title: award.translations[0].title,
    year: award.year,
  };
}

export function processAdministrators(admin) {
  return processPeople(admin, false);
}

export function processPartners(partner) {
  return {
    name: partner.name,
    imageSrc: genImageSrc(partner.logo.id),
    description: partner.translations[0].description,
  };
}

export function processJobs(job, locale) {
  const lang = getLang(locale);

  const parsedJob = {
    langs: extractLanguages(job),
    translation: getTranslation(job, lang),
  };
  return {
    title: parsedJob.translation.title,
    summary: parsedJob.translation.summary,
    location: job.location,
    language: job.language,
    deadline: new Date(job.deadline),
    procDeadline: genDate(job.deadline, locale, true),
    salary: job.salary,
    fte: job.FTE,
    jobType: translate(locale, `contractType.${job.type}`, {}).text,
    tags: job.tags,
    href: genWebsiteUrl(translate(locale, 'navbar.jobs', {}).url, job.slug),
  };
}
