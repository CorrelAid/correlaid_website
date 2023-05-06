import {error} from '@sveltejs/kit';
import {PUBLIC_API_URL} from '$env/static/public';

import {fetch} from 'undici';

async function directus_fetch(query, vars) {
  const payload = {query: query};
  if (typeof vars !== 'undefined') {
    payload['variables'] = vars;
  }

  const response = await fetch(PUBLIC_API_URL + '/graphql', {
    method: 'post',
    body: JSON.stringify(payload),
    headers: {'Content-Type': 'application/json'},
  });
  if (!response.ok) {
    throw error(500, {
      message: `Unexpected cms response ${response.statusText}`,
    });
  }

  const data = await response.json();

  if ('errors' in data) {
    throw error(500, `Cms errors ${data.errors}`);
  }

  return data.data;
}

export default directus_fetch;
