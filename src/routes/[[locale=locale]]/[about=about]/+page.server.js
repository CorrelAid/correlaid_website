import directusFetch from '$lib/js/directusFetch';
import {awardQuery} from './queries.js';
import {getLang} from '$lib/js/helpers';
import {parseEntries} from '$lib/js/parseCms.js';

/** @type {import('./$types').PageLoad} */
export async function load({params, url, route}) {
  const data = await directusFetch(awardQuery, {
    language: getLang(params),
  });
  return {awards: parseEntries(data.Awards, 'awards')};
}
