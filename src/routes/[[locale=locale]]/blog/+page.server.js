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

  // ordering by publication date
  const posts = _.orderBy(data.Posts, item => item.pubdate, ['desc']);

  // checking if post exists in current locale, if not using other language. Getting languages the posts exists in.
  for (let i = 0; i < posts.length; i++) {
    let langs = [];
    for (let y = 0; y < posts[i].translations.length; y++) {
      langs.push(posts[i].translations[y].languages_code.code)
    }
    posts[i].langs = langs;
    let translations = _.find(posts[i].translations, (el) => el.languages_code.code === get_lang(params))
    if (translations === undefined) {
      posts[i].translations = posts[i].translations[0]
    }
    else {
      posts[i].translations = translations
    }
  }

  return { posts: posts }

}