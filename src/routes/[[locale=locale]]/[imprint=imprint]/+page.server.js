import strapi_fetch from '$lib/js/strapi_fetch'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {


  const data = await strapi_fetch("/imprint", "", params);
  

  return { text : data.attributes.text };

}