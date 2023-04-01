import { get_lang } from '$lib/js/helpers';
import directus_fetch from '$lib/js/directus_fetch'

/** @type {import('./$types').PageLoad} */
export async function load({ params, url, route, }) {

    const query = `
  query {
    Partner{
        name
        logo{id}
        translations(
            filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
          ){
            title
            description
        }
        
    }
}
      `
    
    const data = await directus_fetch(query)

    return { partners: data.Partner }

}