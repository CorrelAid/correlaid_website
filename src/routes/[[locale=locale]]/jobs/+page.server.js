import directus_fetch from '$lib/js/directus_fetch';
import {getAllowedStatus} from '$lib/js/directus_fetch.js';
import {jobsOverviewQuery} from './queries.js';
import {parseEntries} from '$lib/js/parse_cms.js';
import {handle_lang} from '$lib/js/helpers';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(jobsOverviewQuery, {
    status: getAllowedStatus(),
  });

  const jobs = handle_lang(data.Jobs, params);

  return {jobs: parseEntries(jobs, 'jobs')};
}
