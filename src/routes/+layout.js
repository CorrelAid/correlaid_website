import directus_fetch from '$lib/js/directus_fetch';
import {get_lang, get_locale, find} from '$lib/js/helpers';
import translations from '$lib/data/translations';

/** @type {import('./$types').PageLoad} */
export async function load({params, url}) {
  // retreive page key by using the url. you cant access stores in server files
  const page_keys = translations[`${get_locale(params)}`];
  // vercels places / in front of path if optional param
  const pk = find(page_keys, url.pathname.replace('//', '/'))[0];

  if (params.slug === undefined) {
    // prettier-ignore
    const query = `query {
      Pages(filter: { page_key: { _eq: "${pk}" } }) {
        builder {
          sort
          collection
          item {
            ... on cta_group{
							ctas{
								ctas_id{
									button{
                  color
                        translations(
                          filter: { languages_code: { code: { _eq: "de-DE" } } }
                        ) {
                          text
                          link
                        }
              }
             
                  translations(
                    filter: { languages_code: { code: { _eq: "de-DE" } } }
                  ){
                      text
                  }
								}
							}
						}
            ... on ctas {
              
              button{
                  color
                        translations(
                          filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
                        ) {
                          text
                          link
                        }
              }
              translations(
                filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
              ){
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
                          link
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
            }
    
            ... on contacts {
              hr
              translations(
                filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
              ) {
                position
                description
              }
              person {
                name
                translations(
                  filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
                ){
                  pronouns
                }
                email
                image {
                  id
                }
              }
            }

            ... on quote_carousel{
              text_only
              quotes{
                  
                  quote_id{
                   
                      image{
                        id
                      }
                      translations(
                        filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
                      ) {
                          subtitle
                          text
                      }
                  }
                  
              }
          }
          ... on timelines{
            steps{
                timeline_steps_id{
                    translations(
                      filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
                    ){
                        text
                    }
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
                    link
                  }
                }
              }
            }
          }
        }
      }
    }
      `

    const data = await directus_fetch(query);

    if (typeof data.Pages[0] === 'undefined') {
      return;
    }
    const builder = data.Pages[0].builder;

    if (builder === undefined) {
    } else {
      return {builder: builder};
    }
  }
}
