import directus_fetch from '$lib/js/directus_fetch';
import {handle_lang} from '$lib/js/helpers';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const query = `query {
    Posts (
      sort: [ "-pubdate" ]
  ){
      pubdate
      title_image{id}
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
          slug
          teaser
      }
    }
  }`;

  console.log(query);

  const data = await directus_fetch(query);

  const posts = handle_lang(data.Posts, params);

  return {posts: posts};
}
