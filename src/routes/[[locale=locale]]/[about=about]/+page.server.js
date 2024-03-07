import directusFetch from '$lib/js/directusFetch';
import {awardQuery} from './queries.js';
import {getLang, getLocale} from '$lib/js/helpers';
import {parse} from '$lib/js/parseCms.js';

/** @type {import('./$types').PageLoad} */
export async function load({params, url, route}) {
  const data = await directusFetch(awardQuery, {
    language: getLang(getLocale(params)),
  });
  return {awards: await parse(data.Awards, 'cards', 'awards', params)};
}
