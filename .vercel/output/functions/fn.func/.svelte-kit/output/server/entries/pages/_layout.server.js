import { d as directus_fetch } from "../../chunks/directus_fetch.js";
import { a as translations, b as get_locale, f as find, c as get_lang } from "../../chunks/helpers.js";
import _ from "lodash";
const config = {
  isr: {
    expiration: 60,
    group: 1,
    bypassToken: "REPLACE_ME_WITH_SECRET_VALUE"
  }
};
async function load({ params, url }) {
  const page_keys = translations[`${get_locale(params)}`];
  const pk = find(page_keys, url.pathname)[0];
  if (!params.slug && !url.pathname.startsWith("/files")) {
    const query = `query {
      Pages(filter: { page_key: { _eq: "${pk}" } }) {
        builder {
          sort
          collection
          item {
            ... on buttons {
              
              translations(
                filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
              ) {
                text
              } 
            }
    
            ... on carousel {
              carousel_elements {
                carousel_element_id {
                  translations(
                    filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
                  ) {
                    title
                  }
                  hero {
                    height
                    gradient_only
                    image {
                      id
                    }
                    translations(
                      filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
                    ) {
                      text
                    }
                    buttons {
                      buttons_id {
                        color
                        translations(
                          filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
                        ) {
                          text
                        }
                      }
                    }
                  }
                }
              }
            }
    
            ... on custom_sections {
              
              id
            }
            ... on wysiwyg {
              
              translations(
                filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
              ) {
                content
              }
              width
            }
    
            ... on contacts {
              
              translations(
                filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
              ) {
                position
                description
              }
              person {
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
    
            ... on heros {
              height
              gradient_only
              image {
                id
              }
              translations(
                filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
              ) {
                text
              }
              buttons {
                buttons_id {
                  color
                  translations(
                    filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
                  ) {
                    text
                  }
                }
              }
            }
          }
        }
      }
    }
      `;
    const data = await directus_fetch(query);
    return { builder: _.orderBy(data.Pages[0].builder, (item) => item.sort, ["asc"]) };
  }
}
export {
  config,
  load
};
