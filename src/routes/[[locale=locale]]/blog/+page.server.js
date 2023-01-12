import strapi_fetch from '$lib/js/strapi_fetch'


/** @type {import('./$types').PageServerLoad} */
export async function load({ setHeaders }) {

  const data = await strapi_fetch("/posts", "de");

  return {posts: data};

}