import translations from '$lib/data/translations';
import {PUBLIC_API_URL} from '$env/static/public';

// extracts the last substring after /
export const getLastItem = (thePath) =>
  thePath.substring(thePath.lastIndexOf('/') + 1);

// extracts the last substring after .
export const getGroup = (thePath) =>
  thePath.substring(thePath.lastIndexOf('.') + 1);

// extracts a translation from translations, given a locale and a page key
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

// contructs regex that matches valid url paramters by extracting them from translations given one or multiple page keys
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

// finds a page key given a valid url
export const find = (v, path) => {
  return Object.keys(v).filter((k) => v[k].url == path);
};

// returns the name of the language in directus format given the path parameters object
export function get_lang(params) {
  let lang;
  if (params.locale) {
    lang = 'en-US';
  } else {
    lang = 'de-DE';
  }
  return lang;
}

// gets the locale name (its undefined when german and taken from params.locale, because locale is optional parameter)
export function get_locale(params) {
  if (params.locale == 'en') {
    return params.locale;
  }
  return 'de';
}

export function gen_img_url(id, transform = '') {
  return `${PUBLIC_API_URL}/assets/${id}?${transform}`;
}

// generates a custom date string given a date string taken from directus and a locale. if year is true, it also return the year
export function gen_date(date, locale, year = false) {
  let options = {
    month: 'long',
    day: 'numeric',
  };
  if (year == true) {
    options = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
  }
  date = new Date(Date.parse(date));

  return date.toLocaleString(locale, options);
}

// generates a custom time string given a time string taken from directus and a locale
export function gen_time(time, locale) {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
  };

  time = new Date(Date.parse('0000-01-01 ' + time));

  return time.toLocaleTimeString(locale, options);
}
