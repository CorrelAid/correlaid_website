import directus_fetch from '$lib/js/directus_fetch';
import {pageContentQuery} from './queries.js';
import {get_lang, get_locale, find} from '$lib/js/helpers';
import translations from '$lib/data/translations';
import {PUBLIC_PRERENDER} from '$env/static/public';
let pr;

if (PUBLIC_PRERENDER === 'ALL') {
  pr = true;
} else {
  pr = 'auto';
}

export const prerender = pr;
export const trailingSlash = 'always';

/** @type {import('./$types').PageLoad} */
export async function load({params, url}) {
  // retreive page key by using the url. you cant access stores in server files
  const page_keys = translations[`${get_locale(params)}`];
  // vercels places / in front of path if optional param
  const pk = find(page_keys, url.pathname.replace('//', '/'))[0];

  if (params.slug === undefined) {
    const vars = {page: pk, language: get_lang(params)};

    const data = await directus_fetch(pageContentQuery, vars);

    if (typeof data.Pages[0] === 'undefined') {
      return;
    }
    const builder = data.Pages[0].builder;

    if (builder === undefined) {
    } else {
      return {builder: builder};
    }
  }
}
