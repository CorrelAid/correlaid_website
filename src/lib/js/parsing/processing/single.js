import {
  translate,
  transformTypes,
  genWebsiteUrl,
  processHtml,
  getTranslation,
  genImageSrc,
  genTime,
  genDate,
  getLang,
  extractLanguages,
} from '../../helpers.js';

import {processLocalChapters} from './cards.js';

import {
  processPeople,
  processOrganizations,
  processProjectOutputs,
} from './processingHelpers.js';

import _ from 'lodash';

export function processEvent(event, locale) {
  const endDate = event.end_date
    ? genDate(event.end_date, locale, true)
    : void 0;
  const date = event.end_date
    ? genDate(event.date, locale, false)
    : genDate(event.date, locale, true);
  return {
    date,
    startTime: genTime(event.start_time, locale),
    endDate,
    endTime: genTime(event.end_time, locale),
    title: event.title,
    teaser: event.teaser,
    description: processHtml(event.description),
    language: event.language,
    tags: event.tags,
    location: event.location,
    registrationLink: event.registration_link,
    online: event.online,
    localChapters: _.map(event.local_chapters, (lc) => {
      return processLocalChapters(lc, locale);
    }),
  };
}

export function processBlogPost(blogPost, locale) {
  const lang = getLang(locale);
  const parsedPost = {
    langs: extractLanguages(blogPost),
    translation: getTranslation(blogPost, lang),
  };

  return {
    title: parsedPost.translation.title,
    text: processHtml(parsedPost.translation.text),
    languages: parsedPost.langs,
    teaser: parsedPost.translation.teaser,
    pubDate: genDate(blogPost.publication_datetime, locale, true),
    imageAlt: parsedPost.translation.image_alt,
    imageSrc: genImageSrc(blogPost.title_image.id),
    imageDesc: blogPost.title_image.description,
    contentCreators: _.map(blogPost.content_creators, (person) => {
      return processPeople(person.Content_Creators_id, false);
    }),
  };
}

export function processProject(project, locale) {
  const lang = getLang(locale);

  return {
    title: project.translations[0].title,
    organization: processOrganizations(project, locale, true),
    description: project.translations[0].description
      ? processHtml(project.translations[0].description)
      : void 0,
    summary: processHtml(project.translations[0].summary),
    isInternal: project.is_internal,
    projectTypes: transformTypes(project.translations[0].type),
    dataTypes: transformTypes(project.translations[0].data),
    projectOutputs: processProjectOutputs(project, locale, lang),
    projectContacts: _.map(project.People, (person) => {
      return processPeople(person.person_id, true);
    }),
  };
}

export function processJob(job, locale) {
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
    procDeadline: genDate(job.deadline, locale),
    salary: job.salary,
    fte: job.FTE,
    jobType: translate(locale, `contractType.${job.type}`, {}).text,
    tags: job.tags,
    href: genWebsiteUrl(translate(locale, 'navbar.jobs', {}).url, job.slug),
    description: processHtml(parsedJob.translation.description),
  };
}
