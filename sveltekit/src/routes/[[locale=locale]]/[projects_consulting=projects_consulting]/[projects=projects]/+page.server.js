import {cache} from '$lib/js/cache'
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

  const data = await cache("projects", query)

  const projects = data.Projects


  return { projects: projects }

}