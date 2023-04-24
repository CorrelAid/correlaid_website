import {PUBLIC_API_URL} from '$env/static/public';
import {error} from '@sveltejs/kit';

import {Directus} from '@directus/sdk';

const directus = new Directus(PUBLIC_API_URL);

async function getDirectusClient() {
  if (directus.auth.token) return directus;
}

export {getDirectusClient};
