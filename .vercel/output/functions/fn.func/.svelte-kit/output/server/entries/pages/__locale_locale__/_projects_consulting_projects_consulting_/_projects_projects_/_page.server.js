import { d as directus_fetch } from "../../../../../chunks/directus_fetch.js";
import { c as get_lang } from "../../../../../chunks/helpers.js";
async function load({ params }) {
  const query = `query{
  Projects{
    status
    translations(
    filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
  ){
        title
        description
        summary
    }
    local_chapters{
        id

    }
}}
  `;
  const data = await directus_fetch(query);
  const projects = data.Projects;
  return { projects };
}
export {
  load
};
