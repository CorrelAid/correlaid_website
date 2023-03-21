import directus_fetch from '$lib/js/directus_fetch'
import { get_lang } from '$lib/js/helpers'
import { unpack_events } from '$lib/js/data_processing'


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

  const query = `query{
    Experts{
      person{
          name
          website
          twitter
          linkedin
          mastodon
          github
          image{
            id
          }
      }
      translations{
          area_of_expertise
          description
      }
  }
  Organizational_Structure{
    translations(
        filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
      ){
        experts
    }
}
  }
  `

  const data = await directus_fetch(query)

  const experts = data.Experts


  return { experts: experts, experts_description: data.Organizational_Structure.translations[0].experts}

}