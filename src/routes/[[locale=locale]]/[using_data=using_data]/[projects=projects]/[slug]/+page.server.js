import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import _ from 'lodash';
import {projectDetailsQuery} from './queries.js';
import {handle_lang} from '$lib/js/helpers';
import {error} from '@sveltejs/kit';
import {parseProject} from '$lib/js/parse_cms';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(projectDetailsQuery, {
    slug: params.slug,
    language: get_lang(params),
  });

  if (data.Projects.length === 0) {
    throw error(404);
  }

  const posts = handle_lang(
    _.flatMap(data.Projects[0].Posts, (data) => [data.Posts_id]),
    params,
  );

  data.Projects[0].Posts = posts;

  return parseProject(data.Projects[0]);
}
