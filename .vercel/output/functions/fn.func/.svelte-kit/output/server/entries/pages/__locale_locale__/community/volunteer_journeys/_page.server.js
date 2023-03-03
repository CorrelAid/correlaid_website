import { d as directus_fetch } from "../../../../../chunks/directus_fetch.js";
async function load({ params }) {
  const query = `query{
    Volunteer_Journeys{
     person{
         name
     }
     translations{
         text
         subtitle
     }
  }
  }
  `;
  const data = await directus_fetch(query);
  const volunteer_journeys = data.Volunteer_Journeys;
  return { volunteer_journeys };
}
export {
  load
};
