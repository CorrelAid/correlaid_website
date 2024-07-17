import directusFetch from '$lib/js/directusFetch';
import {getAllowedStatus} from '$lib/js/directusFetch.js';
import {getLang, getLocale} from '$lib/js/helpers';
import {latestUpdatesQuery} from './queries.js';
import {parse} from '$lib/js/parseCms.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
  const data = await directusFetch(latestUpdatesQuery, {
    language: getLang(getLocale(params)),
    status: getAllowedStatus(),
  });

  const projects = await parse(data.Projects, 'cards', 'projects', params);

  return {
    blogPosts: await parse(data.Blog_Posts, 'cards', 'blogPosts', params),
    projects: projects,
    events: await parse(data.Events, 'cards', 'events', params),
  };
}
