import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import {eventQuery} from './queries.js';
import {parseEntries} from '$lib/js/parse_cms';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(eventQuery, {language: get_lang(params)});

  return {events: parseEntries(data.Events, 'events')};
}
