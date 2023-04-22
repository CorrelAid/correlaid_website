import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const query = `
  query {
    Newsletter_Overview{
        translations(
          filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
        ) {
            nonprofits_text
            nonprofits_button
            nonprofits_link
            volunteers_text
            volunteers_button
            volunteers_link
        }
    }
  }

      `;

  const data = await directus_fetch(query);

  return {newsletter_overview: data.Newsletter_Overview};
}
