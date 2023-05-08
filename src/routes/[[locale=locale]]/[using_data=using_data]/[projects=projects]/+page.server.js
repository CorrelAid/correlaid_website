import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import {handle_lang} from '$lib/js/helpers';
import _ from 'lodash';
import {projectOverviewQuery} from './queries.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(projectOverviewQuery, {
    language: get_lang(params),
  });

  const projects = data.Projects;

  const posts = handle_lang(
    _.flatMap(data.Projects[0].Posts, (data) => [data.Posts_id]),
    params,
  );

  data.Projects[0].Posts = posts;

  return {projects: projects};
}
