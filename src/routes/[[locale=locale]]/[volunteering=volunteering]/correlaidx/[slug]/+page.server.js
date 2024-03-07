import {directusFetch, getAllowedStatus} from '$lib/js/directusFetch';
import {getLang, getLocale} from '$lib/js/helpers';
import {lcDetailsQuery} from './queries.js';
import {error} from '@sveltejs/kit';
import {parse} from '$lib/js/parseCms';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directusFetch(lcDetailsQuery, {
    slug: params.slug,
    language: getLang(getLocale(params)),
    status: getAllowedStatus(),
  });

  if (data.Local_Chapters.length === 0) {
    throw error(404);
  }

  const parsedPage = await parse(data, 'misc', 'localChapterPage', params);

  return {
    localAdministrators: parsedPage.localAdministrators,
    hero: parsedPage.hero,
    description: parsedPage.description,
    projects: parsedPage.projects,
    events: parsedPage.events,
    iconText: parsedPage.iconText,
  };
}
