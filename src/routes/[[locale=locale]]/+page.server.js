import { error } from '@sveltejs/kit'
import strapi_fetch from '$lib/js/strapi_fetch'

const query = "homepage"


/** @type {import('./$types').PageServerLoad} */
export async function load({ setHeaders }) {

  const { response, err } = await strapi_fetch("/homepage");

  if (err) {
    console.log(err)

    throw error(404, {
      message: err
    });
  }

  const data = await response.data

  return { hero : {text: data.attributes.hero.text, url: data.attributes.hero.image.data.attributes.formats.xlarge.url} };

}