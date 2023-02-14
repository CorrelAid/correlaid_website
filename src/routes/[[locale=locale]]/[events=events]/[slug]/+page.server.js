import directus_fetch from '$lib/js/directus_fetch'
import { get_lang } from '$lib/js/helpers'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {


  const query = `query {
    Events(filter:{slug:{_eq: "${params.slug}"}}) {
      id
      occurance
      dates
      registration_link
      target_audience
      language
      description
      type
      scope
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

  const data = await directus_fetch(query)

  return { event: data.Events[0], title: data.Events[0].title }

}