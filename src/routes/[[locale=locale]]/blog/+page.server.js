import directus_fetch from '$lib/js/directus_fetch';
import {handle_lang} from '$lib/js/helpers';
import {get_lang} from '$lib/js/helpers';
import {blogQuery} from './queries.js';
import {parseEntries} from '$lib/js/parse_cms.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(blogQuery, {language: get_lang(params)});

  // console.log(data.Posts[0])

  const posts = handle_lang(data.Posts, params);

  // console.log(posts[0])

  return {posts: parseEntries(posts, 'blog_posts')};
}
