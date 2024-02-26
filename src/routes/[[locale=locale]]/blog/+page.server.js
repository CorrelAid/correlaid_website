import directusFetch from '$lib/js/directusFetch';
import {getAllowedStatus} from '$lib/js/directusFetch.js';
import {handleLang} from '$lib/js/helpers';
import {getLang} from '$lib/js/helpers';
import {blogQuery} from './queries.js';
import {parseEntries} from '$lib/js/parseCms.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directusFetch(blogQuery, {
    language: getLang(params),
    status: getAllowedStatus(),
  });

  const blogPosts = handleLang(data.Blog_Posts, params);

  return {blogPosts: parseEntries(blogPosts, 'blogPosts')};
}
