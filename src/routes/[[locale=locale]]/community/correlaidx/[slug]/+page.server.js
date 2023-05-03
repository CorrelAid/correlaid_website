import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  // prettier-ignore
  const query = `
  
  query{

  
    Events(filter: {local_chapters:{Local_Chapters_id: {translations:{ city:  {_eq : "${params.slug}"}}}}}){
      date
      title
      teaser
      registration_link
      target_group
      language
      type
      slug
      tags
    }
      Local_Chapters(filter: {translations:{ city:  {_eq : "${params.slug}"}}}){
          Projects{
              Projects_id{
            status
            project_id
            Organizations{
              Organizations_id{
                  translations(
                    filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
                  ){
                      languages_code{code}
                      name
                  }
              }
            }
              
              
            translations(
            filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
          ){
               title
            description
            summary
          }
          }
          }
          location
          hero_image{
            id
          }
          founded
          lc_email
          local_administrators{
            Local_Administrators_id{
            translations(
              filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
            ){
                position
                    description
                }
               
          person{
            translations(
              filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
            ) {
              pronouns}
              name
              email
              twitter
              website
              linkedin
              mastodon
              github
              image{
                id
              }

            }
        }}
          translations(filter: { languages_code: { code: {_eq : "${get_lang(params)}"}}}){
              city
              description
          }
      }
    }
  
  
  `
  const data = await directus_fetch(query);

  return {
    local_chapter: data.Local_Chapters[0],
    events: data.Events,
    projects: data.Local_Chapters[0].Projects,
  };
}