import {
  directus_authorized_fetch,
  getAllowedStatus,
} from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import {projectDetailsQuery} from './queries.js';
import {handle_lang} from '$lib/js/helpers';
import {error} from '@sveltejs/kit';
import {parseProject} from '$lib/js/parse_cms';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_authorized_fetch(projectDetailsQuery, {
    slug: params.slug,
    language: get_lang(params),
    status: getAllowedStatus(),
  });

  if (data.Projects.length === 0) {
    throw error(404);
  }

  const blog_posts = handle_lang(
    data.Projects[0].Blog_Posts.map((data) => data.Blog_Posts_id).filter(
      (data) => data !== null,
    ),
    params,
  );

  data.Projects[0].Blog_Posts = blog_posts;

  return parseProject(data.Projects[0]);
}
