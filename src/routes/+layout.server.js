import directus_fetch from '$lib/js/directus_fetch'
import { get_lang, get_locale, find } from '$lib/js/helpers'
import translations from "$lib/data/translations.js";
import _ from "lodash";



/** @type {import('./$types').PageServerLoad} */
export async function load({ params, url, route, }) {

    const page_keys = translations[`${get_locale(params)}`]

    const page_key = find(page_keys,url.pathname)[0]

    let data = {};

    if(!params.slug && !url.pathname.startsWith("/files")){
      const query = `query {
        Pages(filter: { page_key: { _eq: "${page_key}" } }) {
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
                              filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
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
      `
    data = await directus_fetch(query)

    return { builder: _.orderBy(data.Pages[0].builder, item => item.item.sort, ["asc"]) }
    }

    


}