import directus_fetch from '$lib/js/directus_fetch'
import { get_lang, get_locale } from '$lib/js/helpers'



/** @type {import('./$types').PageServerLoad} */
export async function load({ params, url, route, }) {
    let data = {};


    const query1 = `
      query {
        Global_Administrators{
            group
            person{
                image{
                    id
                }
            }
        }
      }
      `

    data = await directus_fetch(query1)

    const remote_office = data.Global_Administrators.filter(person => person.group === 'remote_office');

    const query2 = `
    query {
        Organizational_Structure{
            translations(
                filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
              ){
                remote_office
                board
                ethics_commission
                correlaidx
            }
        }
      }
      `

    data = await directus_fetch(query2)

    const organizational_structure = data.Organizational_Structure
    

    return { remote_office: remote_office, organizational_structure: organizational_structure }

}