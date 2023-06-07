import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import {handle_lang} from '$lib/js/helpers';
import _ from 'lodash';
import {projectOverviewQuery} from './queries.js';
import {parseEntries} from '$lib/js/parse_cms';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(projectOverviewQuery, {
    language: get_lang(params),
  });

  const projects = data.Projects;

  for (const project of projects) {
    const posts = handle_lang(
      _.flatMap(project.Posts, (data) => [data.Posts_id]),
      params,
    );

    project.Posts = posts;
  }

  return {projects: parseEntries(projects, 'projects')};
}
