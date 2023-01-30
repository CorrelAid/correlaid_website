import directus_fetch from '$lib/js/directus_fetch'
import { get_lang, get_locale, find } from '$lib/js/helpers'
import translations from "$lib/data/translations.js";


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
                translations(
                  filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
                ) {
                  text
                }
              }
              ... on wysiwyg {
                translations(
                  filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
                ) {
                  content
                }
                width
              }
              ... on heros {
                image {
                  id
                }
                builder {
                  collection
                  item {
                    ... on button_groups {
                      builder {
                        collection
                        item {
                          ... on buttons {
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
                    ... on wysiwyg {
                      translations(
                        filter: {
                          languages_code: { code: { _eq: "${get_lang(params)}" } }
                        }
                      ) {
                        content
                      }
                      width
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

    return { builder: data.Pages[0].builder }
    }

    


}