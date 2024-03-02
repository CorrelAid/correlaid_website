import directusFetch from '$lib/js/directusFetch';
import {builderQuery} from './queries.js';
import {getLang, getLocale, find} from '$lib/js/helpers';
import pageKeys from '$lib/data/pageKeys';
import {PUBLIC_PRERENDER} from '$env/static/public';
import {error} from '@sveltejs/kit';
import {parse} from '$lib/js/parseCms';

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
  const pageKeys_ = pageKeys[`${getLocale(params)}`];
  // vercels places / in front of path if optional param
  // the NOT_IN_DIRECTUS constant is used such that pk is not undefined which would
  // trigger the query default paramter for pk
  const pk =
    find(pageKeys_, url.pathname.replace('//', '/'))[0] || 'NOT_IN_DIRECTUS';

  if (params.slug === undefined) {
    const vars = {page: pk, language: getLang(params)};

    const data = await directusFetch(builderQuery, vars);

    if (data.Pages.length === 0) {
      error(404, 'Page not found');
    }

    if (typeof data.Pages[0] === 'undefined') {
      error(404, 'Page not found');
    }
    const builder = data.Pages[0].builder;

    if (builder === undefined) {
      error(404, 'Page not found');
    } else {
      return {content: await parse(builder, 'builder')};
    }
  }
}
