import directusFetch from '$lib/js/directusFetch';
import {getAllowedStatus} from '$lib/js/directusFetch.js';
import {getLang, getLocale} from '$lib/js/helpers';
import {blogQuery} from './queries.js';
import {parse} from '$lib/js/parseCms.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directusFetch(blogQuery, {
    language: getLang(getLocale(params)),
    status: getAllowedStatus(),
  });

  return {
    blogPosts: await parse(data.Blog_Posts, 'cards', 'blogPosts', params),
  };
}
