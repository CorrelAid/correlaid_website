import directus_fetch from '$lib/js/directus_fetch'
import { get_lang } from '$lib/js/helpers'
import { unpack_events } from '$lib/js/data_processing'
import {cache} from '$lib/js/cache'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

  const query = `query {
    Events {
      id
      dates
      title
      teaser
      registration_link
      target_group
      language
      type
      slug
      tags
      title_image {
        id
      }
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
  }
  `

  const data = await cache("events",query)

  const events = data.Events

  var lst = []

  for (let i = 0; i < events.length; i++) {

    for (let y = 0; y < events[i].dates.length; y++) {
      if (events[i].dates.length == 1){
        lst.push(unpack_events(events[i], events[i].dates[y]))
      }
      else{
        lst.push(unpack_events(events[i], events[i].dates[y], y+1))
      }
      
    }


  }



  return { events: lst }

}