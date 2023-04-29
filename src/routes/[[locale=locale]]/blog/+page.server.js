import directus_fetch from '$lib/js/directus_fetch';
import {handle_lang} from '$lib/js/helpers';
import {get_lang} from '$lib/js/helpers';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  // prettier-ignore
  const query = `
    query {
      Posts(sort: "-pubdate") {
        pubdate
        title_image {
          id
        }
        content_creators {
          Content_Creators_id {
            translations(
              filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
            ) {
              description
            }
            person {
              name
              translations(
                filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
              ) {
                pronouns
              }
              website
              twitter
              linkedin
              mastodon
              github
              image {
                id
              }
            }
          }
        }
        translations {
          languages_code {
            code
          }
          title
          text
    
          slug
          teaser
        }
      }
    }
    
  `;

  const data = await directus_fetch(query);

  const posts = handle_lang(data.Posts, params);

  return {posts: posts};
}
