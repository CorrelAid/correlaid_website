import directus_fetch from '$lib/js/directus_fetch';
import {awardQuery} from './queries.js';
import {get_lang} from '$lib/js/helpers';

/** @type {import('./$types').PageLoad} */
export async function load({params, url, route}) {
  const data = await directus_fetch(awardQuery, {
    language: get_lang(params),
  });
  return data;
}
