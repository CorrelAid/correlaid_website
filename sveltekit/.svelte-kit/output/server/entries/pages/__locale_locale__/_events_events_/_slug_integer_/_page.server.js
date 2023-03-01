import { d as directus_fetch } from "../../../../../chunks/directus_fetch.js";
import { c as get_lang } from "../../../../../chunks/helpers.js";
async function load({ params }) {
  const query = `query {
    Events(filter:{id: {_eq:"${params.slug}"} translations: { languages_code: { code: {_eq : "${get_lang(params)}"}}}}) {
        date
        language
        type
        scope
        online
        registration_link
        start_time
        end_time
      translations(filter: { languages_code: { code: {_eq : "${get_lang(params)}"}}}){
          title
          description
          location
      }
    }
  }`;
  const data = await directus_fetch(query);
  return { event: data.Events[0], title: data.Events[0].translations[0].title };
}
export {
  load
};
