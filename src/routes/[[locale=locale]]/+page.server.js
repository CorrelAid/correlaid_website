import directus_fetch from '$lib/js/directus_fetch';
import {handle_lang} from '$lib/js/helpers';
import {get_lang} from '$lib/js/helpers';
import {latestUpdatesQuery} from './queries.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
  const data = await directus_fetch(latestUpdatesQuery, {
    language: get_lang(params),
  });

  const posts = handle_lang(data.Posts, params);

  return {
    posts: posts.slice(0, 2),
    events: data.Events.slice(0, 6),
    podcast_episodes: data.Podcast_Episodes.slice(0, 2),
  };
}
