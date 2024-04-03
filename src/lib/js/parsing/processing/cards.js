import {genImageSrc} from '../../helpers.js';

import _ from 'lodash';
import {
  translate,
  transformTypes,
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
    imageAlt: episode.image_alt,
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
  const procDate = event.end_date
    ? genDate(event.date, locale, false)
    : genDate(event.date, locale, true);
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
  };
}

export function processProjects(project, locale) {
  const lang = getLang(locale);

  let href;
  if (project.subpage === true) {
    href = genWebsiteUrl(
      translate(locale, 'navbar.using_data.project_database', {}).url,
      project.project_id,
    );
  } else href = void 0;

  return {
    title: project.translations[0].title,
    summary: project.translations[0].summary,
    href: href,
    projectTypes: transformTypes(project.translations[0].type),
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
    projectOutputs: processProjectOutputs(project, locale, lang),
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
    website: partner.link,
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
    procDeadline: genDate(job.deadline, locale),
    salary: job.salary,
    fte: job.FTE,
    jobType: translate(locale, `contractType.${job.type}`, {}).text,
    tags: job.tags,
    href: genWebsiteUrl(translate(locale, 'navbar.jobs', {}).url, job.slug),
  };
}
