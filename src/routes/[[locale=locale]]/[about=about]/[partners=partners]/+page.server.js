import {get_lang} from '$lib/js/helpers';
import directus_fetch from '$lib/js/directus_fetch';
import {partnerQuery} from './queries.js';
import {parseEntries} from '$lib/js/parse_cms.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(partnerQuery, {language: get_lang(params)});

  return {partners: parseEntries(data.Partners, 'partners')};
}
