import strapi_fetch from '$lib/js/strapi_fetch'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {


  const data = await strapi_fetch("/events", "", params);

  return { hero : {text: data.attributes.hero.text, url: data.attributes.hero.image.data.attributes.formats.xlarge.url} };

}