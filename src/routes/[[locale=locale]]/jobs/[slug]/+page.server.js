import directusFetch from '$lib/js/directusFetch';
import {getLang} from '$lib/js/helpers';
import {jobDetailQuery} from './queries.js';
import {error} from '@sveltejs/kit';
import {parseJobPage} from '$lib/js/parseCms';
import {handleLang} from '$lib/js/helpers';
import {getAllowedStatus} from '$lib/js/directusFetch.js';

export const prerender = 'auto';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const vars = {
    slug: params.slug,
    language: getLang(params),
    status: getAllowedStatus(),
  };
  const data = await directusFetch(jobDetailQuery, vars);

  if (data.Jobs.length === 0) {
    throw error(404);
  }

  // Modifies Jobs in place
  handleLang(data.Jobs, params);

  return parseJobPage(data);
}
