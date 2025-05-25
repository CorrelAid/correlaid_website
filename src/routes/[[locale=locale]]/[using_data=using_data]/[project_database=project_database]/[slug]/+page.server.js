import {directusFetch, getAllowedStatus} from '$lib/js/directusFetch';
import {getLang, getLocale} from '$lib/js/helpers';
import {projectDetailsQuery} from './queries.js';
import {error} from '@sveltejs/kit';
import {parse} from '$lib/js/parseCms';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directusFetch(projectDetailsQuery, {
    slug: params.slug,
    language: getLang(getLocale(params)),
    status: getAllowedStatus(),
  });

  if (data.Projects.length === 0) {
    error(404);
  }

  return {project: await parse(data.Projects[0], 'single', 'project', params)};
}
