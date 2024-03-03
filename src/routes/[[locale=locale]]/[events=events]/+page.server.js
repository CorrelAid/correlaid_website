import {directusFetch, getAllowedStatus} from '$lib/js/directusFetch';
import {getLang} from '$lib/js/helpers';
import {eventQuery} from './queries.js';
import {parse} from '$lib/js/parseCms';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directusFetch(eventQuery, {
    language: getLang(params),
    status: getAllowedStatus(),
  });

  return {events: await parse(data.Events, 'cards', 'events')};
}
