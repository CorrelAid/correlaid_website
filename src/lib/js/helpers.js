import translations from '$lib/data/translations';
import {PUBLIC_API_URL} from '$env/static/public';

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

  // Grab the translation from the translations object.
  const translation = translations[locale][key];

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
export function get_lang(params) {
  let lang;
  if (params.locale) {
    lang = 'en-US';
  } else {
    lang = 'de-DE';
  }
  return lang;
}

export function localeToLang(locale) {
  let lang;
  if (locale === 'de') {
    lang = 'de-DE';
  } else if (locale === 'en') {
    lang = 'en-US';
  } else {
    throw new Error('Unknonw locale');
  }
  return lang;
}

/**
 * Gets the locale name (its undefined when german and taken from params.locale,
 * because locale is optional parameter).
 */
export function get_locale(params) {
  if (params.locale == 'en') {
    return params.locale;
  }
  return 'de';
}

export function gen_img_url(id, transform = '') {
  return `${PUBLIC_API_URL}/assets/${id}?${transform}`;
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
export function gen_date(date, locale, year = false) {
  date = new Date(Date.parse(date));

  return toLocalDateString(date, locale, year);
}

/**
 * Generates a custom time string given a time string taken from
 * directus and a locale.
 */
export function gen_time(time, locale) {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
  };

  time = new Date(Date.parse('0000-01-01 ' + time));

  return time.toLocaleTimeString(locale, options);
}

/**
 * Extracts existing languages from a list from an data entry
 * with translations.
 */
function extractLanguages(entry) {
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

/**
 * Checking if entries exists in current locale, if not falls back to another available language.
 * Also adds an array of existing languages as a property to every entry.
 */
export function handle_lang(entries, params) {
  for (const entry of entries) {
    entry.langs = extractLanguages(entry);
    // TODO: This is not very nice because it changes the data type from array to object.
    // It also is misleading in terms of the naming as the property name is still plural.
    entry.translations = getTranslation(entry, get_lang(params));
  }

  return entries;
}

export function gen_lc_href(params, city) {
  const lc_href = [
    get_locale(params) == 'de' ? '' : '/en',
    '/community/correlaidx/',
    city.toLowerCase(),
  ].join('');
  return lc_href;
}

export function convertContractType(type, locale) {
  if (locale === 'de') {
    switch (type) {
      case 'full-time':
        return 'Vollzeit';
      case 'part-time':
        return `Teilzeit`;
      case 'internship':
        return 'Praktikum';
      case 'volunteer':
        return 'Freiwillig';
      case 'contract':
        return 'Vertrag';
      case 'temporary':
        return 'Zeitlich begrenzt';
      default:
        return type;
    }
  } else {
    switch (type) {
      case 'full-time':
        return 'Full-time';
      case 'part-time':
        return `Part-time`;
      case 'internship':
        return 'Internship';
      case 'volunteer':
        return 'Volunteer';
      case 'contract':
        return 'Contract';
      case 'temporary':
        return 'Temporary';
      default:
        return type;
    }
  }
}
