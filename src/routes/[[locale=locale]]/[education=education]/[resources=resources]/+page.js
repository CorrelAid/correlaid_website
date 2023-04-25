import directus_fetch from '$lib/js/directus_fetch';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const query = `query{
    Workshops{
     name
     language
     teaser
     resource_link
     topic
     series
     target_group
  }
  }
  `;
  console.log(query);

  const data = await directus_fetch(query);

  const workshops = data.Workshops;

  return {workshops: workshops};
}
