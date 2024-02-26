import {directusFetch, getAllowedStatus} from '$lib/js/directusFetch';
import {getLang} from '$lib/js/helpers';
import {lcDetailsQuery} from './queries.js';
import {error} from '@sveltejs/kit';
import {parseLocalChapterPage} from '$lib/js/parseCms';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directusFetch(lcDetailsQuery, {
    slug: params.slug,
    language: getLang(params),
    status: getAllowedStatus(),
  });

  if (data.Local_Chapters.length === 0) {
    throw error(404);
  }

  return parseLocalChapterPage(data, params);
}
