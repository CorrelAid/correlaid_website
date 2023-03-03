import { d as directus_fetch } from "../../../../chunks/directus_fetch.js";
import { c as get_lang } from "../../../../chunks/helpers.js";
async function load({ params, url, route }) {
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
  return { newsletter_overview: data.Newsletter_Overview };
}
export {
  load
};
