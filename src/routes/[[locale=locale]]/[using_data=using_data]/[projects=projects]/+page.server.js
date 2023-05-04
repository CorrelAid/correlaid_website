import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import {projectOverviewQuery} from './queries.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(projectOverviewQuery, {
    language: get_lang(params),
  });

  const projects = data.Projects;

  return {projects: projects};
}
