import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import _ from 'lodash';
import {projectDetailsQuery} from './queries.js';
import {handle_lang} from '$lib/js/helpers';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(projectDetailsQuery, {
    slug: params.slug,
    language: get_lang(params),
  });

  const posts = handle_lang(
    _.flatMap(data.Projects[0].Posts, (data) => [data.Posts_id]),
    params,
  );

  data.Projects[0].Posts = posts;

  return {project: data.Projects[0]};
}
