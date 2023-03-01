import {cache} from '$lib/js/cache'
import { get_lang } from '$lib/js/helpers'

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, url, route, }) {

  const query = `
  query {
    Newsletter_Overview{
        translations(
          filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
        ) {
            nonprofits_text
            nonprofits_button
            nonprofits_link
            volunteers_text
            volunteers_button
            volunteers_link
        }
    }
  }

      `

  const data = await cache("newsletter",query)


  return { newsletter_overview: data.Newsletter_Overview }

}