import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import {lcDetailsQuery} from './queries.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(lcDetailsQuery, {
    slug: params.slug,
    language: get_lang(params),
  });

  return {
    local_chapter: data.Local_Chapters[0],
    events: data.Events,
    projects: data.Local_Chapters[0].Projects,
  };
}
