import {directusFetch, getAllowedStatus} from '$lib/js/directusFetch';
import {getLang} from '$lib/js/helpers';
import {eventDetailQuery} from './queries.js';
import {error} from '@sveltejs/kit';
import {parseEventPage} from '$lib/js/parseCms';

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
  const data = await directusFetch(eventDetailQuery, {
    slug: params.slug,
    language: getLang(params),
    status: getAllowedStatus(),
  });

  if (data.Events.length === 0) {
    throw error(404);
  }

  return parseEventPage(data);
}
