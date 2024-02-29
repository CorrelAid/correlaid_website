import directusFetch from '$lib/js/directusFetch';
import {getAllowedStatus} from '$lib/js/directusFetch.js';
import {jobsOverviewQuery} from './queries.js';
import {parseEntries} from '$lib/js/parseCms.js';
import {handleLang} from '$lib/js/helpers';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directusFetch(jobsOverviewQuery, {
    status: getAllowedStatus(),
  });

  const jobs = handleLang(data.Jobs, params);

  return {jobs: parseEntries(jobs, 'jobs')};
}
