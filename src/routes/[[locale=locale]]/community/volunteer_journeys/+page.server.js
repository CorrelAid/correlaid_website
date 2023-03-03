import directus_fetch from '$lib/js/directus_fetch'


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

  const data = await directus_fetch(query))

  const volunteer_journeys = data.Volunteer_Journeys

  return { volunteer_journeys: volunteer_journeys }

}