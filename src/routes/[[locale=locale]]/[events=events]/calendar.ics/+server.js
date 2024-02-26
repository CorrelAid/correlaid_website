import directusFetch from '$lib/js/directusFetch';
import {PUBLIC_PRERENDER} from '$env/static/public';
import {getAllowedStatus} from '$lib/js/directusFetch.js';
import {createCalendar} from '$lib/js/helpers';
import {getLang} from '$lib/js/helpers';
import {icalEventQuery} from './queries.js';
import {parseEntries} from '$lib/js/parseCms.js';

let pr;

if (PUBLIC_PRERENDER === 'ALL') {
  pr = true;
} else {
  pr = false;
}

export const prerender = pr;

export async function GET({params}) {
  const filename = 'calendar.ics';

  const data = await directusFetch(icalEventQuery, {
    language: getLang(params),
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
