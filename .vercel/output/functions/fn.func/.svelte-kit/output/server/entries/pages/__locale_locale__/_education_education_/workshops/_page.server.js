import { d as directus_fetch } from "../../../../../chunks/directus_fetch.js";
async function load({ params }) {
  const query = `query{
    Workshops{
     name
     language
     teaser
     resource_link
     topic
     series
     target_group
  }
  }
  `;
  const data = await directus_fetch(query);
  const workshops = data.Workshops;
  return { workshops };
}
export {
  load
};
