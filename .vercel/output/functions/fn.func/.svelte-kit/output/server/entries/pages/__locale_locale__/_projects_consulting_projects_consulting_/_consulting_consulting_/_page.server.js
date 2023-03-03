import { d as directus_fetch } from "../../../../../chunks/directus_fetch.js";
async function load({ params }) {
  const query = `query{
    Experts{
      person{
          name
      }
      translations{
          area_of_expertise
      }
  }
  }
  `;
  const data = await directus_fetch(query);
  const experts = data.Experts;
  return { experts };
}
export {
  load
};
