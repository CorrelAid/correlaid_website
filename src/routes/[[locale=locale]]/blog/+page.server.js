import directus_fetch from '$lib/js/directus_fetch';
import {getAllowedStatus} from '$lib/js/directus_fetch.js';
import {handle_lang} from '$lib/js/helpers';
import {get_lang} from '$lib/js/helpers';
import {blogQuery} from './queries.js';
import {parseEntries} from '$lib/js/parse_cms.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(blogQuery, {
    language: get_lang(params),
    status: getAllowedStatus(),
  });

  // console.log(data.Posts[0])

  const blog_posts = handle_lang(data.Blog_Posts, params);

  // console.log(blog_posts[0])

  return {blog_posts: parseEntries(blog_posts, 'blog_posts')};
}
