import {get_lang} from '$lib/js/helpers';
import directus_fetch from '$lib/js/directus_fetch';
import {partnerQuery} from './queries.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(partnerQuery, {language: get_lang(params)});

  return {partners: data.Partner};
}
