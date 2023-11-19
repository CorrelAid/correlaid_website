import {
  directus_authorized_fetch,
  getAllowedStatus,
} from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import {lcDetailsQuery} from './queries.js';
import {error} from '@sveltejs/kit';
import {parseLocalChapterPage} from '$lib/js/parse_cms';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_authorized_fetch(lcDetailsQuery, {
    slug: params.slug,
    language: get_lang(params),
    status: getAllowedStatus(),
  });

  if (data.Local_Chapters.length === 0) {
    throw error(404);
  }

  return parseLocalChapterPage(data, params);
}
