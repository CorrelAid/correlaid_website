import {directusFetch, getAllowedStatus} from '$lib/js/directusFetch';
import {getLang} from '$lib/js/helpers';
import {projectDetailsQuery} from './queries.js';
import {handleLang} from '$lib/js/helpers';
import {error} from '@sveltejs/kit';
import {parseProject} from '$lib/js/parseCms';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directusFetch(projectDetailsQuery, {
    slug: params.slug,
    language: getLang(params),
    status: getAllowedStatus(),
  });

  if (data.Projects.length === 0) {
    throw error(404);
  }

  const blogPosts = handleLang(
    data.Projects[0].Blog_Posts.map((data) => data.Blog_Posts_id).filter(
      (data) => data !== null,
    ),
    params,
  );

  data.Projects[0].Blog_Posts = blogPosts;

  return parseProject(data.Projects[0], params);
}
