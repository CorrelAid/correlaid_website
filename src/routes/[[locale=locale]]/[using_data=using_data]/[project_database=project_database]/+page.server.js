import {directusFetch, getAllowedStatus} from '$lib/js/directusFetch';
import {getLang} from '$lib/js/helpers';
import {projectOverviewQuery} from './queries.js';
import {parseEntries} from '$lib/js/parseCms';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directusFetch(projectOverviewQuery, {
    language: getLang(params),
    status: getAllowedStatus(),
  });

  const projects = parseEntries(data.Projects, 'projects', false, [
    params,
  ]).sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

  return {projects: projects};
}
