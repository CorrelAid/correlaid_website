import { d as directus_fetch } from "../../chunks/directus_fetch.js";
import { a as translations, b as get_locale, f as find, c as get_lang } from "../../chunks/helpers.js";
import _ from "lodash";
async function load({ params, url, route }) {
  const page_keys = translations[`${get_locale(params)}`];
  const pk = find(page_keys, url.pathname)[0];
  let data = {};
  if (!params.slug && !url.pathname.startsWith("/files")) {
    const query = `query {
        Pages(filter: { page_key: { _eq: "${pk}" } }) {
          builder {
            collection
            item {
              ... on buttons {
                sort
                translations(
                  filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
                ) {
                  text
                }
              }
      
              ... on carousel {
                sort
                builder {
                  collection
                  item {
                    ... on carousel_element {
                      id
                      image{
                        id
                      }
                      translations(
                        filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
                      ) {
                        title
                        text
                      }
                    }
                  }
                }
              }
      
              ... on custom_sections {
                sort
                id
              }
              ... on wysiwyg {
                sort
                translations(
                  filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
                ) {
                  content
                }
                width
              }
      
              ... on contacts {
                sort
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
                sort
                image {
                  id
                }
                builder {
                  collection
                  item {
                    ... on button_groups {
                      sort
                      builder {
                        collection
                        item {
                          ... on buttons {
                            sort
                            color
                            translations(
                              filter: {
                                languages_code: {
                                  code: { _eq: "${get_lang(params)}" }
                                }
                              }
                            ) {
                              text
                            }
                          }
                        }
                      }
                    }
                    ... on text_fields {
                      sort
                      translations(
                        filter: {
                          languages_code: { code: { _eq: "${get_lang(params)}" } }
                        }
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
      }
      `;
    data = await directus_fetch(query);
    return { builder: _.orderBy(data.Pages[0].builder, (item) => item.item.sort, ["asc"]) };
  }
}
export {
  load
};
