import directus_fetch from '$lib/js/directus_fetch'
import { get_lang } from '$lib/js/helpers'


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {


  const query = `query{
    Local_Chapters(filter: {translations:{ city:  {_eq : "${params.slug}"}}}){
        location
        founded
        image{
          id
        }
        local_administrators{
          Local_Administrators_id{
          translations(
            filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
          ){
              position
                  description
              }
             
        person{
            name
            website
            twitter
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
  }`


  console.log(query)
  const data = await directus_fetch(query)

  return { local_chapter: data.Local_Chapters[0] }

}