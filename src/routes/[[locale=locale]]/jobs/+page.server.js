import directusFetch from '$lib/js/directusFetch';
import {getAllowedStatus} from '$lib/js/directusFetch.js';
import {jobsOverviewQuery} from './queries.js';
import {parse} from '$lib/js/parseCms.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directusFetch(jobsOverviewQuery, {
    status: getAllowedStatus(),
  });

  return {jobs: await parse(data.Jobs, 'cards', 'jobs', params)};
}
