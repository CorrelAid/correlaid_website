import { error } from '@sveltejs/kit'
import strapi_fetch from '$lib/js/strapi_fetch'

const query = "homepage"


/** @type {import('./$types').PageServerLoad} */
export async function load({ setHeaders }) {
  // const home = await handle("home",false);
  const data = await strapi_fetch("/homepage");
 
// Doesnt seem to work
 setHeaders({
    'cache-control': "max-age=20000"
  });
  // return {home: home.data, about: about.data}
  console.log(data)
}