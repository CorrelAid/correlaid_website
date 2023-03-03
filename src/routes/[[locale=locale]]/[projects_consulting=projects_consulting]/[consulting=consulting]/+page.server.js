import directus_fetch from '$lib/js/directus_fetch'
import { get_lang } from '$lib/js/helpers'
import { unpack_events } from '$lib/js/data_processing'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

  const query = `query{
    Experts{
      person{
          name
      }
      translations{
          area_of_expertise
      }
  }
  }
  `

  const data = await directus_fetch(query)

  const experts = data.Experts

  return { experts: experts }

}