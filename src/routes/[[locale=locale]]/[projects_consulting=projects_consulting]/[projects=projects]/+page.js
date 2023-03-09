import directus_fetch from '$lib/js/directus_fetch'
import { get_lang } from '$lib/js/helpers'
import { unpack_events } from '$lib/js/data_processing'


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

  const query = `query{
  Projects{
    status
    project_id
    organizations{
      Projects_Organization_id{
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
    local_chapters{
        id

    }
}}
  `
  
  const data = await directus_fetch(query)

  const projects = data.Projects


  return { projects: projects }

}