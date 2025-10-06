import {directusFetch, getAllowedStatus} from '$lib/js/directusFetch';
import {getLang, getLocale} from '$lib/js/helpers';
import {localChapterQuery} from './queries.js';
import {parse} from '$lib/js/parseCms';

/** @type {import('./$types.js').PageServerLoad} */
export async function load({params}) {
  const data = await directusFetch(localChapterQuery, {
    language: getLang(getLocale(params)),
    status: getAllowedStatus(),
  });

  return {
    geoJson: await parse(
      data.Local_Chapters,
      'misc',
      'localChaptersMap',
      params,
    ),
    localChapters: await parse(
      data.Local_Chapters,
      'cards',
      'localChapters',
      params,
    ),
    originalLocalChapters: data.Local_Chapters,
  };
}
