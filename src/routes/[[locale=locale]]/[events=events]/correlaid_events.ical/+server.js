import directus_fetch from '$lib/js/directus_fetch';
import {PUBLIC_PRERENDER} from '$env/static/public';
import {getAllowedStatus} from '$lib/js/directus_fetch.js';
import {createCalendar} from '$lib/js/helpers';
import {get_lang} from '$lib/js/helpers';
import {icalEventQuery} from './queries.js';
import {parseEntries} from '$lib/js/parse_cms.js';

let pr;

if (PUBLIC_PRERENDER === 'ALL') {
  pr = true;
} else {
  pr = false;
}

export const prerender = pr;

export async function GET({params}) {
  const filename = 'correlaid_events.ical';

  const data = await directus_fetch(icalEventQuery, {
    language: get_lang(params),
    status: getAllowedStatus(),
  });

  const Events = parseEntries(data.Events, 'icalEvents');

  const calendar = createCalendar(Events, params, '');

  return new Response(calendar, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename='${filename}'`,
    },
    status: 200,
  });
}
