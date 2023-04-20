import directus_fetch from '$lib/js/directus_fetch'
import { get_lang } from '$lib/js/helpers'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {


  const query = `query {
    Events(filter:{slug:{_eq: "${params.slug}"}}) {
      id
      date
      start_time
      end_time
      registration_link
      target_group
      language
      description
      teaser
      type
      online
      title
      location
      tags
      local_chapters {
        Local_Chapters_id {
          translations(
            filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
          ) {
            city
          }
        }
      }
  
    }
  }
  `

  const data = await directus_fetch(query)

  return { event: data.Events[0] }

}