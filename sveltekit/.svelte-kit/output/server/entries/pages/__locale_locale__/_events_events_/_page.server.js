import { d as directus_fetch } from "../../../../chunks/directus_fetch.js";
import { c as get_lang } from "../../../../chunks/helpers.js";
async function load({ params }) {
  const query = `query {
    Events (filter: {date: {
      _gte: "$NOW"}}){
        id
        date
        language
        type
        scope
        online
      translations(filter: { languages_code: { code: {_eq : "${get_lang(params)}"}}}){
          title
          teaser
          location
          title_image{id}
          tags 
      }
    }
  }`;
  const data = await directus_fetch(query);
  return { events: data.Events };
}
export {
  load
};
