import directus_fetch from '$lib/js/directus_fetch'
import { get_lang } from '$lib/js/helpers'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {


  const query = `query {
    Posts(filter: { translations: { slug: { _eq: "${params.slug}"}}}) {
       
      translations(filter: { languages_code: { code: {_eq : "${get_lang(params)}"}}}){
          title
          text
          title_image{id}
          slug
          teaser

      }
    }
  }`


  const data = await directus_fetch(query)

  return {post: data.Posts[0], title:  data.Posts[0].translations[0].title}

}