import {cache} from '$lib/js/cache'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

  const query = `query{
    Volunteer_Journeys{
     person{
         name
     }
     translations{
         text
         subtitle
     }
  }
  }
  `

  const data = await cache("volunteer_journeys", query)

  const volunteer_journeys = data.Volunteer_Journeys

  return { volunteer_journeys: volunteer_journeys }

}