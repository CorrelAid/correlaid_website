import directus_fetch from '$lib/js/directus_fetch'
import { get_lang } from '$lib/js/helpers'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {


  const query = `query {
    Events(filter:{translations: {slug: {_eq:"${params.slug}"}}}) {
        date
        language
        type
        scope
        online
      translations(filter: { languages_code: { code: {_eq : "${get_lang(params)}"}}}){
          title
          description
          location
      }
    }
  }`


  const data = await directus_fetch(query)

  return {event: data.Events[0], title:  data.Events[0].translations[0].title}

}