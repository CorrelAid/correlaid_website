import { g as gen_img_url } from "../../../../../chunks/helpers.js";
import { d as directus_fetch } from "../../../../../chunks/directus_fetch.js";
const GET = async ({ params }) => {
  const query = `
    query {
      Documents(filter:{translations:{slug:{_eq: "${params.slug}"}}}){
          translations(filter: { languages_code: { code: {_eq : "${get_lang(params)}"}}}{
              document{
                  id
              }
          }
      }
}
`;
  const data = await directus_fetch(query);
  const file_id = data.Documents[0].translations[0].document.id;
  const file_name = gen_img_url(file_id);
  return new Response("Redirect", { status: 303, headers: { Location: file_name } });
};
export {
  GET
};
