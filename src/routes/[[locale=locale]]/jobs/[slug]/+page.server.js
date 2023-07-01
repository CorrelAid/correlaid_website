import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import {jobDetailQuery} from './queries.js';
import {error} from '@sveltejs/kit';
import {parseJobPage} from '$lib/js/parse_cms';
import {handle_lang} from '$lib/js/helpers';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const vars = {
    slug: params.slug,
    language: get_lang(params),
  };
  const data = await directus_fetch(jobDetailQuery, vars);

  if (data.Jobs.length === 0) {
    throw error(404);
  }

  // Modifies Jobs in place
  handle_lang(data.Jobs, params);

  return parseJobPage(data);
}
