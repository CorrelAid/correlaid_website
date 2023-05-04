import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import {workshopQuery} from './queries.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(workshopQuery, {
    language: get_lang(params),
  });

  const workshops = data.Workshops;

  return {workshops: workshops};
}
