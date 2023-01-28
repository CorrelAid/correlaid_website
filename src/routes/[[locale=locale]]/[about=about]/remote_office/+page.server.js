import directus_fetch from '$lib/js/directus_fetch'
import { get_lang, get_locale } from '$lib/js/helpers'



/** @type {import('./$types').PageServerLoad} */
export async function load({ params, url, route, }) {
    let data = {};


    const query = `
      query {
        Global_Administrators(filter: { group: { _eq: "remote_office"  } }){
            person{
                name
                website
                twitter
                linkedin
                mastodon
                image{
                    id
                }
            }
            translations(
                filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
              ) {
                position
                description
            }
        }
      }
      `

    data = await directus_fetch(query)

    return { global_administrators: data.Global_Administrators }

}