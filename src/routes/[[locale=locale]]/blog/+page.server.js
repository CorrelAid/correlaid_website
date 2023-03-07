import directus_fetch from '$lib/js/directus_fetch'
import { get_lang } from '$lib/js/helpers'
import _ from "lodash";


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {


  const query = `query {
    Posts {
      pubdate
      content_creators{
        Content_Creators_id{
            person{
                name
            }
        }
    }
       
      translations{
        languages_code{
          code
      }
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

  const posts = _.orderBy(data.Posts, item => item.pubdate, ['desc']);

  return { posts: posts }

}