import { d as directus_fetch } from "../../../../../../chunks/directus_fetch.js";
import { c as get_lang } from "../../../../../../chunks/helpers.js";
async function load({ params }) {
  const query = `query{
    Local_Chapters(filter: {translations:{ city:  {_eq : "${params.slug}"}}}){
        location
        founded
        translations(filter: { languages_code: { code: {_eq : "${get_lang(params)}"}}}){
            city
            description
        }
    }
  }`;
  const data = await directus_fetch(query);
  return { local_chapter: data.Local_Chapters[0] };
}
export {
  load
};
