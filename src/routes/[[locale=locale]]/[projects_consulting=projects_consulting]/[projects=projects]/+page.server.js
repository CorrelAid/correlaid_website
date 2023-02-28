import directus_fetch from '$lib/js/directus_fetch'
import { get_lang } from '$lib/js/helpers'
import { unpack_events } from '$lib/js/data_processing'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

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
  `
console.log(query)
  const data = await directus_fetch(query)

  const projects = data.Projects


  return { projects: projects }

}