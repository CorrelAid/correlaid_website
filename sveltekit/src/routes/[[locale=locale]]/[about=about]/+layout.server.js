import directus_fetch from '$lib/js/directus_fetch';
import { get_lang } from '$lib/js/helpers';
import {cache} from '$lib/js/cache'

/** @type {import('./$types').PageServerLoad} */
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
            title
            remote_office
            board
            ethics_commission
            correlaidx
        }
    }
  }
      `

  const data = await cache("groups",query)

  const remote_office = data.Global_Administrators.filter(person => person.group === 'remote_office');
  const board = data.Global_Administrators.filter(person => person.group === 'board');
  const ethics_commission = data.Global_Administrators.filter(person => person.group === 'ethics_commission');

  return { remote_office: remote_office, board: board, ethics_commission: ethics_commission, organizational_structure: data.Organizational_Structure }

}