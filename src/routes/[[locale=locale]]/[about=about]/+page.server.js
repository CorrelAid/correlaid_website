import directus_fetch from '$lib/js/directus_fetch';
import {awardQuery} from './queries.js';

/** @type {import('./$types').PageLoad} */
export async function load({params, url, route}) {
  const data = await directus_fetch(awardQuery);
  return {
    awards: data,
  };
}
