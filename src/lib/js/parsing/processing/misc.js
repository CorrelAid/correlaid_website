import {
  translate,
  genWebsiteUrl,
  genImageSrc,
  processHtml,
  genDate,
} from '../../helpers.js';
import {v5 as uuidv5} from 'uuid';
import _ from 'lodash';
import he from 'he';

import {processPeople, processContentCreators} from './processingHelpers.js';
import {processProjects, processEvents} from './cards.js';

export function processLocalChaptersMap(localChapters, locale) {
  const geoJson = {
    type: 'FeatureCollection',
    features: [],
  };

  for (let i = 0; i < localChapters.length; i++) {
    const obj = {
      type: 'Feature',
      geometry: localChapters[i].location,
      properties: {
        founded: localChapters[i].founded,
        name: `CorrelAidX ${localChapters[i].translations[0].city}`,
        href: genWebsiteUrl(
          translate(locale, 'navbar.volunteering.correlaidx', {}).url,
          localChapters[i].short_id,
        ),
      },
    };
    geoJson.features.push(obj);
  }
  return geoJson;
}

export function processLocalChapterPage(page, locale) {
  const parsedHero = {
    gradientOnly: false,
    height: 'half',
    correlaidx: true,
    text: `${page.Local_Chapters[0].translations[0].city}`,
    imageAlt: page.Local_Chapters[0].translations[0].hero_image_alt,
    imageSrc: genImageSrc(page.Local_Chapters[0].hero_image.id),
    imageDesc: page.Local_Chapters[0].hero_image.description,
  };

  return {
    localAdministrators: _.map(
      page.Local_Chapters[0].local_administrators,
      (admin) => {
        const proc = processPeople(admin.Local_Administrators_id, false);
        proc['email'] = page.Local_Chapters[0].lc_email;
        return proc;
      },
    ),
    projects: _.map(page.Local_Chapters[0].Projects, (project) => {
      return processProjects(project.Projects_id, locale);
    }),
    events: _.map(page.Events, (event) => {
      return processEvents(event, locale);
    }),
    hero: parsedHero,
    description: page.Local_Chapters[0].translations[0].description
      ? processHtml(page.Local_Chapters[0].translations[0].description)
      : void 0,
    iconText: page.Local_Chapters[0].translations[0].how_to_get_in_touch
      ? processHtml(page.Local_Chapters[0].translations[0].how_to_get_in_touch)
      : void 0,
  };
}

export function processIcal(events, locale) {
  return _.map(events, (ical) => {
    const startDate = ical.start_time
      ? new Date(`${ical.date} ${ical.start_time}`)
      : new Date(ical.date);

    const endDate = ical.end_date
      ? ical.end_time
        ? new Date(`${ical.end_date} ${ical.end_time}`)
        : new Date(ical.end_date)
      : new Date(`${ical.date} ${ical.end_time}`);

    const location = ical.online === true ? 'Online' : ical.location;
    const uuid5 = uuidv5(ical.title, uuidv5.URL);

    const organizer = 'CorrelAid <info@correlaid.org>';

    const url = `https://correlaid.org${genWebsiteUrl(
      translate(locale, 'navbar.events', {}).url,
      ical.slug,
    )}`;
    return {
      id: uuid5,
      start: startDate,
      end: endDate,
      category: ical.type,
      summary: ical.title,
      description: ical.teaser,
      location: location, // You can add the location extraction logic here
      organizer: organizer, // You can add the organizer extraction logic here
      url: url,
    };
  });
}

export function processRssEntry(entry, locale) {
  const link = `https://correlaid.org${genWebsiteUrl(
    translate(locale, 'navbar.blog', {}).url,
    entry.translations[0].slug,
  )}`;
  const author = _.map(
    processContentCreators(entry.content_creators),
    'name',
  ).join(', ');
  const temp = {
    title: entry.translations[0].title,
    description: entry.translations[0].teaser,
    content: processHtml(entry.translations[0].text),
    language: locale,
    link: link,
    author: author,
    pubDate: genDate(entry.publication_datetime, locale, true),
  };
  // Encode all values in the rootConf object
  for (const key in temp) {
    if (temp.hasOwnProperty(key)) {
      temp[key] = he.encode(temp[key]);
    }
  }

  return temp;
}
