import directus_fetch from '$lib/js/directus_fetch';
import {handle_lang} from '$lib/js/helpers';
import {get_lang} from '$lib/js/helpers';
import {blogQuery} from './queries.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(blogQuery, {language: get_lang(params)});

  const posts = handle_lang(data.Posts, params);

  return {posts: posts};
}
