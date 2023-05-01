import directus_fetch from '$lib/js/directus_fetch';

/** @type {import('./$types').PageLoad} */
export async function load({params, url, route}) {
  const query = `
  query{
    Awards(sort: ["-year"]){
        image{id}
        year
        translations{
            title
            image_alt
        }
    }
}
      `;

  const data = await directus_fetch(query);
  return {
    awards: data,
  };
}
