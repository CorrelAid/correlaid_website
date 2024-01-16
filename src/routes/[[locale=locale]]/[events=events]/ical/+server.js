import directus_fetch from '$lib/js/directus_fetch';
import {PUBLIC_PRERENDER} from '$env/static/public';
import {getAllowedStatus} from '$lib/js/directus_fetch.js';
import {get_locale} from '$lib/js/helpers';
import {get_lang} from '$lib/js/helpers';
import {icalEventQuery} from './queries.js';
import {parseEntries} from '$lib/js/parse_cms.js';
import icalendar from 'ical-generator';
import {v5 as uuidv5} from 'uuid';

let pr;

if (PUBLIC_PRERENDER === 'ALL') {
  pr = true;
} else {
  pr = false;
}

export const prerender = pr;

export async function GET({params}) {
  const filename = 'global_events.ical';

  const data = await directus_fetch(icalEventQuery, {
    language: get_lang(params),
    status: getAllowedStatus(),
  });

  const Events = parseEntries(data.Events, 'icalEvents');
  const calendar = icalendar({
    prodId: `//CorrelAid//NONSGML CorrelAid Events V1.0//${get_locale(
      params,
    ).toUpperCase()}`,
    events: Events.map((event) => {
      const startDate = event.start_time
        ? new Date(`${event.date} ${event.start_time}`)
        : new Date(event.date);
      const endDate = event.end_date
        ? event.end_time
          ? new Date(`${event.end_date} ${event.end_time}`)
          : new Date(event.end_date)
        : new Date(`${event.date} ${event.end_time}`);
      const location = event.online ? 'Online' : event.location;

      const uuid5 = uuidv5(event.id.toString(), uuidv5.URL);

      return {
        id: uuid5,
        start: startDate,
        end: endDate,
        category: event.type,
        summary: event.title,
        description: event.teaser,
        location: location,
        url: `https://correlaid.org${
          params.locale == 'en' ? '/en' : ''
        }/events/${event.slug}`,
      };
    }),
  });

  return new Response(calendar.toString(), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename='${filename}'`,
    },
    status: 200,
  });
}
