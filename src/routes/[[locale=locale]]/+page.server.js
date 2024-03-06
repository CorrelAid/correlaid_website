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

  return {
    blogPosts: await parse(
      data.Blog_Posts.slice(0, 2),
      'cards',
      'blogPosts',
      params,
    ),
    events: await parse(data.Events.slice(0, 4), 'cards', 'events', params),
    podcastEpisodes: await parse(
      data.Podcast_Episodes.slice(0, 2),
      'cards',
      'podcastEpisodes',
      params,
    ),
  };
}
