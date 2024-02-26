import directusFetch from '$lib/js/directusFetch';
import {getAllowedStatus} from '$lib/js/directusFetch.js';
import {getLang} from '$lib/js/helpers';
import {blogPostQuery} from './queries.js';
import {error} from '@sveltejs/kit';
import {parseBlogPostPage} from '$lib/js/parseCms';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const vars = {
    slug: params.slug,
    language: getLang(params),
    status: getAllowedStatus(),
  };
  const data = await directusFetch(blogPostQuery, vars);

  if (data.Blog_Posts.length === 0) {
    throw error(404);
  }

  return parseBlogPostPage(data);
}
