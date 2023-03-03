import { d as directus_fetch } from "../../../../chunks/directus_fetch.js";
async function load({ params }) {
  const query = `query{
    Podcast_Episodes{
    title
    link
  }}
  `;
  const data = await directus_fetch(query);
  const podcast_episodes = data.Podcast_Episodes;
  return { podcast_episodes };
}
export {
  load
};
