import directusFetch from '$lib/js/directusFetch';
import {getLang, getLocale} from '$lib/js/helpers';
import {podcastQuery} from './queries.js';
import {parse} from '$lib/js/parseCms.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directusFetch(podcastQuery, {
    language: getLang(getLocale(params)),
  });

  const podcastEpisodes = data.Podcast_Episodes;

  return {
    podcastEpisodes: await parse(podcastEpisodes, 'cards', 'podcastEpisodes'),
  };
}
