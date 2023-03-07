import directus_fetch from '$lib/js/directus_fetch'
import { get_lang } from '$lib/js/helpers'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {


  const query = `query {
    Projects(filter:{project_id:{_eq: "${params.project_id}"}}) {
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
      organizations{
        Projects_Organization_id{
            translations{
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
      local_chapters{
          id
  
      }
  }
  }
  `
  console.log(query)
  const data = await directus_fetch(query)

  return { project: data.Projects[0] }

}