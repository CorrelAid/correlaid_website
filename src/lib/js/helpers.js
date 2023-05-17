import translations from '$lib/data/translations';
import _ from 'lodash';
import {PUBLIC_API_URL} from '$env/static/public';

/*
 * Extracts the last substring after /
 */
export const getLastItem = (thePath) =>
  thePath.substring(thePath.lastIndexOf('/') + 1);

/*
 * Extracts the last substring after .
 */
export const getGroup = (thePath) =>
  thePath.substring(thePath.lastIndexOf('.') + 1);

/*
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

/*
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

/*
 * Finds a page key given a valid url.
 */
export const find = (v, path) => {
  return Object.keys(v).filter((k) => v[k].url === normalizePath(path));
};

/*
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

/* Gets the locale name (its undefined when german and taken from params.locale,
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

/*
 * Generates a custom date string given a date string taken from directus and a locale.
 * If year is true, it also return the year
 */
export function gen_date(date, locale, year = false) {
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
  date = new Date(Date.parse(date));

  return date.toLocaleString(locale, options);
}

/*
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

/*
 * Checking if post exists in current locale, if not using other language.
 * Getting languages the posts exists in.
 */
export function handle_lang(posts, params) {
  for (let i = 0; i < posts.length; i++) {
    const langs = [];
    const translations = [];
    for (let y = 0; y < posts[i].translations.length; y++) {
      if (posts[i].translations[y].slug != null) {
        langs.push(posts[i].translations[y].languages_code.code);
        translations.push(posts[i].translations[y]);
      }
    }
    posts[i].langs = langs;
    const used_translation = _.find(
      translations,
      (el) => el.languages_code.code === get_lang(params),
    );

    if (used_translation) {
      posts[i].translations = used_translation;
    } else {
      posts[i].translations = translations[0];
    }
  }

  return posts;
}

export function gen_lc_href(params, city) {
  const lc_href = [
    get_locale(params) == 'de' ? '' : '/en',
    '/community/correlaidx/',
    city,
  ].join('');
  return lc_href;
}
