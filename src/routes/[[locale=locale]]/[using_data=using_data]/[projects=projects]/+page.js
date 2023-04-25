import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const query = `
query{
  Projects{
    status
    project_id
    Organizations{
      Organizations_id{
          translations(
            filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
          ){
              languages_code{code}
              name
          }
      }
    }
    translations(
    filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
  ){
    
        title
        description
        summary
    }
    Local_Chapters{
        id

    }
}}
  `;

  const data = await directus_fetch(query);

  const projects = data.Projects;

  return {projects: projects};
}
