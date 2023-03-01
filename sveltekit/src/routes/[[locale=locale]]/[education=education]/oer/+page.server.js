import {cache} from '$lib/js/cache'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

  const query = `query{
    OER{
    kind
    link
    translations{
        title
    }
  }
  }
  `

  const data = await cache("workshops", query)

  const oer = data.OER

  return { oer: oer }

}