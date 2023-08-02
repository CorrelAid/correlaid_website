import directus_fetch from '$lib/js/directus_fetch';
import {pageContentQuery} from './queries.js';
import {get_lang, get_locale, find} from '$lib/js/helpers';
import translations from '$lib/data/translations';
import {PUBLIC_PRERENDER} from '$env/static/public';
import {parseContent} from '$lib/js/parse_cms';

let pr;

if (PUBLIC_PRERENDER === 'ALL') {
  pr = true;
} else {
  pr = false;
}

export const prerender = pr;
export const trailingSlash = 'always';

/** @type {import('./$types').PageLoad} */
export async function load({params, url}) {
  // retreive page key by using the url. you cant access stores in server files
  const page_keys = translations[`${get_locale(params)}`];
  // vercels places / in front of path if optional param
  // the NOT_IN_DIRECTUS constant is used such that pk is not undefined which would
  // trigger the query default paramter for pk
  const pk =
    find(page_keys, url.pathname.replace('//', '/'))[0] || 'NOT_IN_DIRECTUS';

  if (params.slug === undefined) {
    const vars = {page: pk, language: get_lang(params)};

    const data = await directus_fetch(pageContentQuery, vars);

    if (data.Pages.length === 0) {
      return;
    }

    if (typeof data.Pages[0] === 'undefined') {
      return;
    }
    const builder = data.Pages[0].builder;

    if (builder === undefined) {
      return;
    } else {
      return {content: parseContent(builder)};
    }
  }
}
