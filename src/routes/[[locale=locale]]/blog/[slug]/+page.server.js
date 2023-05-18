import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import {blogPostQuery} from './queries.js';
import {error} from '@sveltejs/kit';
import {parseBlogPostPage} from '$lib/js/parse_cms';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const vars = {
    slug: params.slug,
    language: get_lang(params),
  };
  const data = await directus_fetch(blogPostQuery, vars);

  if (data.Posts.length === 0) {
    throw error(404);
  }

  return parseBlogPostPage(data);
}
