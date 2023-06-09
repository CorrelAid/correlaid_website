import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import {podcastQuery} from './queries.js';
import {parseEntries} from '$lib/js/parse_cms.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(podcastQuery, {language: get_lang(params)});

  const podcast_episodes = data.Podcast_Episodes;

  return {podcast_episodes: parseEntries(podcast_episodes, 'podcast_episodes')};
}
