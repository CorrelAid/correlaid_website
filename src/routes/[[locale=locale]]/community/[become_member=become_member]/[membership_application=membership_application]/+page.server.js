import directus_fetch from '$lib/js/directus_fetch';
import {MembershipQuery} from './queries.js';
import {PUBLIC_MEMBERSHIP_UPLOADER_API_URL} from '$env/static/public';

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
  const data = await directus_fetch(MembershipQuery);

  return {
    membership_application: data.membership_application,
    membership_application_uploader_api_url: PUBLIC_MEMBERSHIP_UPLOADER_API_URL,
  };
}
