import { d as directus_fetch } from "../../../../../chunks/directus_fetch.js";
async function load({ params }) {
  const query = `query{
    OER{
    kind
    link
    translations{
        title
    }
  }
  }
  `;
  const data = await directus_fetch(query);
  const oer = data.OER;
  return { oer };
}
export {
  load
};
