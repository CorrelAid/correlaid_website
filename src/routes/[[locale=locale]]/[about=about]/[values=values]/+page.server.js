import {get_lang} from '$lib/js/helpers';
import directus_fetch from '$lib/js/directus_fetch';

/** @type {import('./$types').PageLoad} */
export async function load({params, url, route}) {
  const query = `
  query {
    Global_Administrators(sort: ["sort"]) {
      translations(
        filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
      ) {
        position
        description
      }
      group
      person {
        translations(
          filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
        ) {
          pronouns}
        email
        name
        website
        twitter
        linkedin
        mastodon
        image {
          id
        }
      }
    }
  
  

}
      `;

  const data = await directus_fetch(query);

  const ethics_commission = data.Global_Administrators.filter(
    (person) => person.group === 'ethics_commission',
  );

  return {
    ethics_commission: ethics_commission,
  };
}