import directus_fetch from '$lib/js/directus_fetch';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const query = `query{
    Podcast_Episodes{
    title
    soundcloud_link
    description
  }}
  `;

  console.log(query);

  const data = await directus_fetch(query);

  const podcast_episodes = data.Podcast_Episodes;

  return {podcast_episodes: podcast_episodes};
}
