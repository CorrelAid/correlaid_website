import directusFetch from '$lib/js/directusFetch';
import {getLang} from '$lib/js/helpers';
import {podcastQuery} from './queries.js';
import {parseEntries} from '$lib/js/parseCms.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directusFetch(podcastQuery, {language: getLang(params)});

  const podcastEpisodes = data.Podcast_Episodes;

  return {podcastEpisodes: parseEntries(podcastEpisodes, 'podcastEpisodes')};
}
