import directusFetch from '$lib/js/directusFetch';
import {getLang, getLocale} from '$lib/js/helpers';
import {jobDetailQuery} from './queries.js';
import {error} from '@sveltejs/kit';
import {parse} from '$lib/js/parseCms';
import {getAllowedStatus} from '$lib/js/directusFetch.js';

export const prerender = 'auto';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const vars = {
    slug: params.slug,
    language: getLang(getLocale(params)),
    status: getAllowedStatus(),
  };
  const data = await directusFetch(jobDetailQuery, vars);

  if (data.Jobs.length === 0) {
    throw error(404);
  }

  return {job: await parse(data.Jobs[0], 'single', 'job', params)};
}
