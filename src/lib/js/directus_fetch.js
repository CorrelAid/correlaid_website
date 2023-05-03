import {error} from '@sveltejs/kit';
import {PUBLIC_API_URL} from '$env/static/public';

import {Directus} from '@directus/sdk';
const directus = new Directus(PUBLIC_API_URL);

const directus_fetch = async (query, vars) => {
  let data;

  try {
    const response = await directus.graphql.items(query, vars);
    data = response.data;
  } catch (err) {
    throw error(500, {
      message: err.message,
    });
  }

  return data;
};

export default directus_fetch;
