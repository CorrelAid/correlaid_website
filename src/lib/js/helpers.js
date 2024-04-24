import translations from '$lib/data/translations';
import pageKeys from '$lib/data/pageKeys';
import {PUBLIC_API_URL} from '$env/static/public';
import * as cheerio from 'cheerio';
import icalendar from 'ical-generator';

/**
 * Extracts the last substring after /
 */
export const getLastItem = (thePath) =>
  thePath.substring(thePath.lastIndexOf('/') + 1);

/**
 * Extracts the last substring after .
 */
export const getGroup = (thePath) =>
  thePath.substring(thePath.lastIndexOf('.') + 1);

/**
 * Extracts a translation from translations, given a locale and a page key.
 */
export function translate(locale, key, vars) {
  // Let's throw some errors if we're trying to use keys/locales that don't exist.
  if (!key) throw new Error('no key provided to $t()');
  if (!locale) throw new Error(`no translation for key "${key}"`);

  const translateObject = {};

  translateObject['en'] = {
    ...translations['en'],
    ...pageKeys['en'],
  };

  translateObject['de'] = {
    ...translations['de'],
    ...pageKeys['de'],
  };

  // Grab the translation from the translations object.
  const translation = translateObject[locale][key];

  if (!translation)
    throw new Error(`no translation found for ${locale}.${key}`);

  let text = translation.text;
  const url = translation.url;

  // Replace any passed in variables in the translation string.
  Object.keys(vars).map((k) => {
    const regex = new RegExp(`{{${k}}}`, 'g');
    text = text.replace(regex, vars[k]);
  });

  return {text, url};
}

/**
 * Contructs regex that matches valid url paramters by extracting
 * them from translations given one or multiple page keys.
 */
export function constructRe(keys) {
  let str = '';
  for (let i = 0; i < keys.length; i++) {
    const en = getLastItem(translate('en', keys[i], {}).url);
    const de = getLastItem(translate('de', keys[i], {}).url);
    // or at end ofregex only for last item (if list is doesnt consist of 1 item)
    if (i != keys.length && keys.length != 1) {
      str = str + `${de}|${en}|`;
    } else {
      str = str + `${de}|${en}`;
    }
  }

  const re = new RegExp(`^${str}`);
  return re;
}

function normalizePath(path) {
  if (path === '/') {
    return '/';
  } else if (path.slice(-1) === '/') {
    return path.slice(0, -1);
  } else {
    return path;
  }
}

/**
 * Finds a page key given a valid url.
 */
export const find = (v, path) => {
  return Object.keys(v).filter((k) => v[k].url === normalizePath(path));
};

/**
 * Returns the name of the language in directus format given the path parameters object.
 */
export function getLang(locale) {
  let lang;
  if (locale === 'de') {
    lang = 'de-DE';
  } else if (locale === 'en') {
    lang = 'en-US';
  } else {
    throw new Error('Unknown locale');
  }
  return lang;
}

/**
 * Gets the locale name (its undefined when german and taken from params.locale,
 * because locale is optional parameter).
 */
export function getLocale(params) {
  if (params.locale == 'en') {
    return params.locale;
  }
  return 'de';
}

export function genImageSrc(id, transform = '') {
  return `${PUBLIC_API_URL}/assets/${id}?format=webp&${transform}`;
}

/**
 * Generates a custom date string given a Date object
 *
 * @param {Date} date
 * @param {string} locale String representation of the locale
 * @param {boolean} year A Flag whether the output should contain the year
 * @return {string} Represents the date formatted according to the locale and the year flag
 */
export function toLocalDateString(date, locale, year = false) {
  let options = {
    month: 'long',
    day: 'numeric',
  };
  if (year) {
    options = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
  }
  return date.toLocaleString(locale, options);
}

/**
 * Generates a custom date string.
 *
 * @param {string} date String representation of a date
 * @param {string} locale String representation of the locale
 * @param {boolean} year A Flag whether the output should contain the year
 * @return {string} Represents the date formatted according to the locale and the year flag
 */
export function genDate(date, locale, year = false) {
  const parsedDate = new Date(Date.parse(date));

  if (isNaN(parsedDate)) {
    throw new Error('Invalid date');
  }

  return toLocalDateString(parsedDate, locale, year);
}

/**
 * Generates a custom time string given a time string taken from
 * directus and a locale.
 */
export function genTime(time, locale) {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
  };

  const parsedTime = new Date(Date.parse('0000-01-01 ' + time));

  if (isNaN(parsedTime)) {
    throw new Error('Invalid time');
  }

  return parsedTime.toLocaleTimeString(locale, options);
}

/**
 * Extracts existing languages from a list from an data entry
 * with translations.
 */
export function extractLanguages(entry) {
  const langs = entry.translations.map((translation) => {
    return translation.languages_code.code;
  });
  return langs;
}

/**
 * Get translation translation with fallback.
 * The fallback is any other available translation.
 */
export function getTranslation(entry, currentLanguage) {
  const translation = entry.translations.find(
    (translation) => translation.languages_code.code === currentLanguage,
  );
  if (translation) {
    return translation;
  } else {
    return entry.translations[0];
  }
}

export function processHtml(html) {
  if (typeof html === 'undefined' || html === '') {
    throw new Error('HTML must be defined');
  }
  const $ = cheerio.load(html);

  // Process <img> tags
  $('img').each((index, img) => {
    const $img = $(img);
    const title = $img.attr('title');

    if (title) {
      const $figure = $('<figure>');
      const $caption = $('<figcaption>')
        .html(title)
        .addClass('text-xs text-base-content mt-2');

      $figure.append($img.clone());
      $figure.append($caption);

      $img.replaceWith($figure);
    }

    // Add query to img src URL
    const src = $img.attr('src');
    const imgWithQuery = src.includes('?')
      ? `${src}&format=webp`
      : `${src}?format=webp`;
    $img.attr('src', imgWithQuery);
  });

  return $.html();
}

export function translateSelectLabels(select, locale, param) {
  if (param == 'targetAudience') {
    const select_ = JSON.parse(JSON.stringify(select));
    for (const item of select_) {
      let label = item.label.replace(/ /g, '_');
      label = label.toLowerCase();
      item.label = translate(locale, `${param}.${label}`, {}).text;
    }
    return select_;
  } else {
    return select;
  }
}

export function createCalendar(events, params, lc = '') {
  const calendar = icalendar({
    prodId: `//CorrelAid//NONSGML CorrelAid${
      lc != '' ? `X ${lc}` : ''
    } Events V1.0//${getLocale(params).toUpperCase()}`,
    events: events,
  });
  return calendar.toString();
}

export function toCamelCase(input) {
  return input
    .toLowerCase()
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase());
}

export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function transformTypes(types) {
  const procTypes = types.map((str) => toTitleCase(str.replace(/_/g, ' ')));
  return procTypes;
}

export function transformSector(sector) {
  let procSector = sector.replace(/_/g, ', ');
  if (procSector == 'intermediaries, voluntarismpromotion') {
    procSector = 'Philantrophic Intermediaries, Voluntarism, Promotion';
  }
  if (procSector == 'professional, associations, unions') {
    procSector = 'Business Associations, Professional Associations, Unions';
  }
  return procSector;
}

export function genWebsiteUrl(base, slug) {
  if (typeof base === 'undefined' || typeof slug === 'undefined') {
    throw new Error('Both base and slug must be defined');
  }
  const url = base + '/' + slug;
  return url;
}
