import directus_fetch from '$lib/js/directus_fetch'
import { get_lang } from '$lib/js/helpers'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

    const query = `query {
        Pages(filter: { page_key: {_eq: "footer.imprint"}}) {
            
          translations(filter: { languages_code: { code: {_eq : "${get_lang(params)}"}}}){
             content
          }
        }
      }`

      const data = await directus_fetch(query)

      return { page: data.Pages[0].translations[0].content }

}