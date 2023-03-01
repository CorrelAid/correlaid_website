import {cache} from '$lib/js/cache'
import { get_lang } from '$lib/js/helpers'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {


  const query = `query {
    Events(filter:{slug:{_eq: "${params.slug}"}}) {
      id
      dates
      registration_link
      target_group
      language
      description
      type
      online
      title
      location
      tags
      title_image {
        id
      }
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

  const data = await cache(`events_${params.slug}`, query)

  return { event: data.Events[0], title: data.Events[0].title }

}