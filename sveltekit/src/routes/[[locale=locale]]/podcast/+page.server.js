import {cache} from '$lib/js/cache'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

  const query = `query{
    Podcast_Episodes{
    title
    link
  }}
  `

  const data = await cache("experts", query)

  const podcast_episodes = data.Podcast_Episodes

  return { podcast_episodes: podcast_episodes }

}