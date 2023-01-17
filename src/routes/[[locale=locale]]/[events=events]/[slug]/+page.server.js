import directus_fetch from '$lib/js/directus_fetch'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {


  const data = await directus_fetch("Events", params)


  return data[0] 

}