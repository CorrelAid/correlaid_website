import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import _ from 'lodash';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  // prettier-ignore
  const query = `
  query {
    Posts(filter: { translations: { slug: { _eq: "${params.slug}" } } }) {
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
  `

  const data = await directus_fetch(query);
  // checking if post exists in current locale, if not using other language
  let lang_content = _.find(
    data.Posts[0].translations,
    (el) => el.languages_code.code === get_lang(params),
  );

  if (lang_content === undefined) {
    lang_content = data.Posts[0].translations[0];
  }

  return {
    pubdate: data.Posts[0].pubdate,
    lang_content: lang_content,
    content_creators: data.Posts[0].content_creators,
    post: data.Posts[0],
  };
}
