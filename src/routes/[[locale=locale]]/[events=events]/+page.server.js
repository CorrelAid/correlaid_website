import {
  directus_authorized_fetch,
  getAllowedStatus,
} from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import {eventQuery} from './queries.js';
import {parseEntries} from '$lib/js/parse_cms';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_authorized_fetch(eventQuery, {
    language: get_lang(params),
    status: getAllowedStatus(),
  });

  return {events: parseEntries(data.Events, 'events')};
}
