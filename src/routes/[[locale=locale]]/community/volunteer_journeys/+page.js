import directus_fetch from '$lib/js/directus_fetch'

import { get_lang, get_locale, find } from '$lib/js/helpers'
/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

  const query = `query{
    Volunteer_Journeys{
     person{
         name
         image{id}
     }
     translations(
      filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
    ){
         text
         subtitle
     }
  }
  }
  `

  const data = await directus_fetch(query)

  const volunteer_journeys = data.Volunteer_Journeys

  return { volunteer_journeys: volunteer_journeys }

}