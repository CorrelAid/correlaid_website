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

  const projects = parseEntries(data.Projects, 'projects', true, [params]).sort(
    (a, b) => new Date(b.end_date) - new Date(a.end_date),
  );

  // console.log('projects', projects)

  // Some projects are anonymized and contain sensitive data.
  // In case of an error, we don't want to log the input, which is
  // why we set logInputOnError to false.
  return {projects: projects};
}
