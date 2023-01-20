import directus_fetch from '$lib/js/directus_fetch'
import { get_lang } from '$lib/js/helpers'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {


  const query = `query {
    Events {
        date
        language
        type
        scope
        online
      translations(filter: { languages_code: { code: {_eq : "${get_lang(params)}"}}}){
          title
          slug
          teaser
          location
          title_image{id}
          tags 
      }
    }
  }`


  const data = await directus_fetch(query)

  return { events: data.Events }

}