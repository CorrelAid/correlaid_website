import directus_fetch from '$lib/js/directus_fetch'
import { get_lang } from '$lib/js/helpers'
import _ from "lodash";



/** @type {import('./$types').PageLoad} */
export async function load({ params }) {


  // prettier-ignore
  const query = `
  query {
    Projects(filter:{project_id:{_eq: "${params.slug}"}}) {
      Podcast{
        language
        soundcloud_link
        title
    }
    Posts{
        Posts_id{
            id
            translations{
                languages_code{
                    code
                }
                title
                slug
            }
        }
    }
    Projects_Outputs{
        url
        output_type
    }
      People{
        People_id{
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
    }
      Organizations{
        Organizations_id{
            translations(
              filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
            ){
                languages_code{code}
                name
                description
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
      Local_Chapters{
          id
  
      }
  }
  }

  `

  const data = await directus_fetch(query)
  const Posts = data.Projects[0].Posts

  // checking if post exists in current locale, if not using other language. Getting languages the posts exists in.
  if (Posts.length != 0) {
    let translations = _.find(Posts[0].Posts_id.translations, (el) => el.languages_code.code === get_lang(params))
    if (translations === undefined) {
      Posts[0].Posts_id.translations = Posts[0].Posts_id.translations[0]
    }
    else {
      Posts[0].Posts_id.translations = translations
    }
  }

  return { project: data.Projects[0] }

}
