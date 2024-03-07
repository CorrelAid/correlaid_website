import {directusFetch, getAllowedStatus} from '$lib/js/directusFetch';
import {getLang, getLocale} from '$lib/js/helpers';
import {projectOverviewQuery} from './queries.js';
import {parse} from '$lib/js/parseCms';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directusFetch(projectOverviewQuery, {
    language: getLang(getLocale(params)),
    status: getAllowedStatus(),
  });

  const projects = await parse(data.Projects, 'cards', 'projects', params);

  return {projects: projects};
}
