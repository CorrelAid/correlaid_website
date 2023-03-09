import directus_fetch from '$lib/js/directus_fetch'


/** @type {import('./$types').PageLoad} */
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
  const data = await directus_fetch(query)
  

  const oer = data.OER

  return { oer: oer }

}