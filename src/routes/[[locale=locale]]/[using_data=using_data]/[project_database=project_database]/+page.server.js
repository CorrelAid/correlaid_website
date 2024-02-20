import {directus_fetch, getAllowedStatus} from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import {projectOverviewQuery} from './queries.js';
import {parseEntries} from '$lib/js/parse_cms';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(projectOverviewQuery, {
    language: get_lang(params),
    status: getAllowedStatus(),
  });

  const projects = parseEntries(data.Projects, 'projects', false, [
    params,
  ]).sort((a, b) => new Date(b.end_date) - new Date(a.end_date));

  return {projects: projects};
}
