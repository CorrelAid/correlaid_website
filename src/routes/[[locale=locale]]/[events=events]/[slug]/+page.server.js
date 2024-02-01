import {directus_fetch, getAllowedStatus} from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import {eventDetailQuery} from './queries.js';
import {error} from '@sveltejs/kit';
import {parseEventPage} from '$lib/js/parse_cms';

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
  const data = await directus_fetch(eventDetailQuery, {
    slug: params.slug,
    language: get_lang(params),
    status: getAllowedStatus(),
  });

  if (data.Events.length === 0) {
    throw error(404);
  }

  return parseEventPage(data);
}
