import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const query = `query{
    Experts{
      person{
        translations(
          filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
        ) {
          pronouns}
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
