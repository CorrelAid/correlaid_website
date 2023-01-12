import strapi_fetch from '$lib/js/strapi_fetch'


/** @type {import('./$types').PageServerLoad} */
export async function load({ setHeaders }) {

  const data = await strapi_fetch("/events");

  console.log(data)

  return {data};

}