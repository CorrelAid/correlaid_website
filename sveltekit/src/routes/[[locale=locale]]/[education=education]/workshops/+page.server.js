import {cache} from '$lib/js/cache'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

  const query = `query{
    Workshops{
     name
     language
     teaser
     resource_link
     topic
     series
     target_group
  }
  }
  `

  const data = await cache("workshops", query)

  const workshops = data.Workshops

  return { workshops: workshops }

}