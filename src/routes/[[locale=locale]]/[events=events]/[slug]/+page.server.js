import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import {eventDetailQuery} from './queries.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
  const data = await directus_fetch(eventDetailQuery, {
    slug: params.slug,
    language: get_lang(params),
  });

  return {event: data.Events[0]};
}
