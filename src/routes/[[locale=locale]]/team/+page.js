import { get_lang } from '$lib/js/helpers';
import directus_fetch from '$lib/js/directus_fetch'

/** @type {import('./$types').PageLoad} */
export async function load({ params, url, route, }) {

  const query = `
  query {
    Global_Administrators(sort: ["sort"]) {
      translations(
        filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
      ) {
        position
        description
      }
      group
      person {
        name
        website
        twitter
        linkedin
        mastodon
        image {
          id
        }
      }
    }
  
  
  Organizational_Structure{
    translations(
        filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
      ){
        remote_office
        board
        ethics_commission
    }
}
}
      `

      const data = await directus_fetch(query)

  const remote_office = data.Global_Administrators.filter(person => person.group === 'remote_office');
  const board = data.Global_Administrators.filter(person => person.group === 'board');
  const ethics_commission = data.Global_Administrators.filter(person => person.group === 'ethics_commission');
  const organizational_structure = data.Organizational_Structure;

  return { remote_office: remote_office, board: board, ethics_commission: ethics_commission, organizational_structure: organizational_structure}

}