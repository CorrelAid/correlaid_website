import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import {expertsQuery} from './queries.js';
import {parseEntries} from '$lib/js/parse_cms';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(expertsQuery, {language: get_lang(params)});

  const experts = parseEntries(data.Experts, 'experts');

  return {experts: experts};
}
