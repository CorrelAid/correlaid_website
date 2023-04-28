import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  // prettier-ignore
  const query = `
  query {
    Workshops {
      name
      language
      teaser
      resource_link
      responsible_unit
      local_chapters {
        Local_Chapters_id {
          translations(filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }) {
            city
          }
        }
      }
    }
  }
  `;

  const data = await directus_fetch(query);

  const workshops = data.Workshops;

  return {workshops: workshops};
}
