import strapi_fetch from '$lib/js/strapi_fetch'


/** @type {import('./$types').PageServerLoad} */
export async function load({ setHeaders }) {

  const data = await strapi_fetch("/homepage", "de", "");

  return { hero : {text: data.attributes.hero.text, url: data.attributes.hero.image.data.attributes.formats.xlarge.url} };

}