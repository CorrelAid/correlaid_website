import directus_fetch from '$lib/js/directus_fetch';
import {handle_lang} from '$lib/js/helpers';
import {get_lang} from '$lib/js/helpers';

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
  // prettier-ignore
  const query = `
  query{
	Posts( 
        sort: [ "-pubdate" ]
    ){
		pubdate
    title_image{id}
      content_creators{
        Content_Creators_id{
            person{
                name
                translations(
                  filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
                ) {
                  pronouns}
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
    Events(sort: [ "-date" ]) {
      id
      date
      start_time
      end_time
      title
      teaser
      registration_link
      target_group
      language
      type
      slug
      tags
      local_chapters {
        Local_Chapters_id {
          translations(
            filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
          ) {
            city
          }
        }
      }
  
    }
   
      Podcast_Episodes(sort: "-publication_datetime"){
      title
      soundcloud_link
      description
      language
      publication_datetime
      tags
      content_creators{
        Content_Creators_id{
            person{
                name
                translations(
                  filter: { languages_code: { code: { _eq: "${get_lang(params)}" } } }
                ) {
                  pronouns}
            }
        }
    }
    }
}`

  const data = await directus_fetch(query);

  const posts = handle_lang(data.Posts, params);

  return {
    posts: posts.slice(0, 2),
    events: data.Events.slice(0, 6),
    podcast_episodes: data.Podcast_Episodes.slice(0, 2),
  };
}
