import directus_fetch from '$lib/js/directus_fetch';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const query = `query{
    Experts{
      person{
          name
          website
          twitter
          linkedin
          mastodon
          github
          image{
            id
          }
      }
      translations{
          area_of_expertise
          description
      }
  }
  
  }
  `;

  const data = await directus_fetch(query);

  const experts = data.Experts;

  return {experts: experts};
}
