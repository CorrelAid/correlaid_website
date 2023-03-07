import directus_fetch from '$lib/js/directus_fetch'
import { get_lang } from '$lib/js/helpers'
import _ from "lodash";

import { BYPASS_TOKEN } from '$env/static/private';

export const config = {
  isr: {
    expiration: 60,
    group: 1,
    bypassToken: BYPASS_TOKEN,
  },
};


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {


  const query = `query {
    Posts(filter: { translations: { slug: { _eq: "${params.slug}"}}}) {
       pubdate
       content_creators{
        Content_Creators_id{
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
        }
    }
      translations{
        languages_code{
          code
      }
          title
          text
          title_image{id}
          slug
          teaser

      }
    }
  }`

  const data = await directus_fetch(query)

  let lang_content = _.find(data.Posts[0].translations, el => el.languages_code.code === get_lang(params))

  if(lang_content === undefined){
    lang_content = data.Posts[0].translations[0]
  }
    
 
  return { pubdate: data.Posts[0].pubdate, lang_content: lang_content, content_creators: data.Posts[0].content_creators  }

}