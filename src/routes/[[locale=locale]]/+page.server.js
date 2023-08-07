import directus_fetch from '$lib/js/directus_fetch';
import {getAllowedStatus} from '$lib/js/directus_fetch.js';
import {handle_lang} from '$lib/js/helpers';
import {get_lang} from '$lib/js/helpers';
import {latestUpdatesQuery} from './queries.js';
import {parseEntries} from '$lib/js/parse_cms.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
  const data = await directus_fetch(latestUpdatesQuery, {
    language: get_lang(params),
    status: getAllowedStatus(),
  });

  const posts = handle_lang(data.Blog_Posts, params);

  return {
    posts: parseEntries(posts.slice(0, 2), 'blog_posts'),
    events: parseEntries(data.Events.slice(0, 6), 'events'),
    podcast_episodes: parseEntries(
      data.Podcast_Episodes.slice(0, 2),
      'podcast_episodes',
    ),
  };
}
