import directusFetch from '$lib/js/directusFetch';
import {getLang} from '$lib/js/helpers';
import {workshopQuery} from './queries.js';
import {parse} from '$lib/js/parseCms';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directusFetch(workshopQuery, {
    language: getLang(params),
  });

  return {workshops: await parse(data.Workshops, 'cards', 'workshops', params)};
}
