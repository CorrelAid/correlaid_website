import { error } from '@sveltejs/kit'
import strapi_fetch from '$lib/js/strapi_fetch'

const query = "homepage"


/** @type {import('./$types').PageServerLoad} */
export async function load({ setHeaders }) {

  const { response, err } = await strapi_fetch("/posts");

  if (err) {
    console.log(err)

    throw error(404, {
      message: err
    });
  }

  const data = await response.data

  console.log(data)

  return {  };

}