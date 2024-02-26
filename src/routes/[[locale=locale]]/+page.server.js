import directusFetch from '$lib/js/directusFetch';
import {getAllowedStatus} from '$lib/js/directusFetch.js';
import {handleLang} from '$lib/js/helpers';
import {getLang} from '$lib/js/helpers';
import {latestUpdatesQuery} from './queries.js';
import {parseEntries} from '$lib/js/parseCms.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
  const data = await directusFetch(latestUpdatesQuery, {
    language: getLang(params),
    status: getAllowedStatus(),
  });

  const blogPosts = handleLang(data.Blog_Posts, params);

  return {
    blogPosts: parseEntries(blogPosts.slice(0, 2), 'blogPosts'),
    events: parseEntries(data.Events.slice(0, 6), 'events'),
    podcastEpisodes: parseEntries(
      data.Podcast_Episodes.slice(0, 2),
      'podcastEpisodes',
    ),
  };
}
