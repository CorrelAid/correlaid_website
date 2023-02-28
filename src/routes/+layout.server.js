import directus_fetch from '$lib/js/directus_fetch'
import { get_lang, get_locale, find } from '$lib/js/helpers'
import translations from "$lib/data/translations";
import _ from "lodash";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, url, route, }) {

  // retreive page key by using the url. you cant access stores in server files
  const page_keys = translations[`${get_locale(params)}`]
  const pk = find(page_keys, url.pathname)[0]

  let data = {};

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
                
                builder {
                  sort
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
                
                image {
                  id
                }
                builder {
                  collection
                  item {
                    ... on button_groups {
                      
                      builder {
                        sort
                        collection
                        item {
                          ... on buttons {
                            
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
    // sorting page builder items by sort field
    return { builder: _.orderBy(data.Pages[0].builder, item => item.sort, ["asc"]) }
  }




}