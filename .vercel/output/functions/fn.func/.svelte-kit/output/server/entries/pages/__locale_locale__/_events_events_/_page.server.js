import { d as directus_fetch } from "../../../../chunks/directus_fetch.js";
import { c as get_lang } from "../../../../chunks/helpers.js";
function unpack_events(event, date, part = false) {
  const obj = JSON.parse(JSON.stringify(event));
  obj.date = date.date;
  obj.start_time = date.start_time;
  obj.end_time = date.end_time;
  if (part != false) {
    obj.title = event.title + `- Part ${part}`;
  }
  return obj;
}
async function load({ params }) {
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
  `;
  const data = await directus_fetch(query);
  const events = data.Events;
  var lst = [];
  for (let i = 0; i < events.length; i++) {
    for (let y = 0; y < events[i].dates.length; y++) {
      if (events[i].dates.length == 1) {
        lst.push(unpack_events(events[i], events[i].dates[y]));
      } else {
        lst.push(unpack_events(events[i], events[i].dates[y], y + 1));
      }
    }
  }
  return { events: lst };
}
export {
  load
};
