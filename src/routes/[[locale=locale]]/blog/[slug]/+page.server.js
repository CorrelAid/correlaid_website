import directus_fetch from '$lib/js/directus_fetch';
import {getAllowedStatus} from '$lib/js/directus_fetch.js';
import {get_lang} from '$lib/js/helpers';
import {blogPostQuery} from './queries.js';
import {error} from '@sveltejs/kit';
import {parseBlogPostPage} from '$lib/js/parse_cms';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const vars = {
    slug: params.slug,
    language: get_lang(params),
    status: getAllowedStatus(),
  };
  const data = await directus_fetch(blogPostQuery, vars);

  if (data.Blog_Posts.length === 0) {
    throw error(404);
  }

  return parseBlogPostPage(data);
}
