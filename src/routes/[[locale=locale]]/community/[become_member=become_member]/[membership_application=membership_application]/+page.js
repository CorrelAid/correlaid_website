import directus_fetch from '$lib/js/directus_fetch';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const query = `query{
    membership_application{
        object
    }
}
  `;

  const data = await directus_fetch(query);

  const membership_application = data.membership_application;

  return {membership_application: membership_application};
}
