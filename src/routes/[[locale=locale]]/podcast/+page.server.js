import directus_fetch from '$lib/js/directus_fetch'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

  const query = `query{
    Podcast_Episodes{
    title
    link
  }}
  `

  const data = await directus_fetch(query)

  const podcast_episodes = data.Podcast_Episodes

  return { podcast_episodes: podcast_episodes }

}