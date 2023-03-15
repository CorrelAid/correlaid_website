import directus_fetch from '$lib/js/directus_fetch'
import { get_lang } from '$lib/js/helpers'
import { unpack_events } from '$lib/js/data_processing'


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

  const query = `query {
    Events {
      id
      date
      start_time
      end_time
      title
      teaser
      registration_link
      target_group
      language
      type
      slug
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

  const data = await directus_fetch(query)

  const events = data.Events


  return { events: data.Events }

}