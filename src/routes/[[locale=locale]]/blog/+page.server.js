import directus_fetch from '$lib/js/directus_fetch'
import { get_lang } from '$lib/js/helpers'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {


  const query = `query {
    Posts {
      content_creators{
        Content_Creators_id{
            translations(filter: { languages_code: { code: {_eq : "${get_lang(params)}"}}}){
                position
                description
            }
            person{
                name
            }
        }
    }
       
      translations(filter: { languages_code: { code: {_eq : "${get_lang(params)}"}}}){
          title
          text
          tags
          title_image{id}
          slug
          teaser
          

      }
    }
  }`


  const data = await directus_fetch(query)

  return { posts: data.Posts }

}