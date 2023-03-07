import directus_fetch from '$lib/js/directus_fetch'
import { get_lang, get_locale, find } from '$lib/js/helpers'
import translations from "$lib/data/translations";
import _ from "lodash";

import { BYPASS_TOKEN } from '$env/static/private';

/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
  isr: {
    expiration: 60,
    group: 1,
    bypassToken: BYPASS_TOKEN,
  },
};




/** @type {import('./$types').PageServerLoad} */
export async function load({ params, url }) {

  // retreive page key by using the url. you cant access stores in server files
  const page_keys = translations[`${get_locale(params)}`]
  const pk = find(page_keys, url.pathname)[0]

  let data = {};
  if (!params.slug && !params.project_id) {
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
      `
     
      const data = await directus_fetch(query)

    
    const builder = data.Pages[0].builder
    
    if (builder !== undefined){
      return { builder:  builder}
    }
    
  }




}