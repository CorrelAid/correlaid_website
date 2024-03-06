import directusFetch from '$lib/js/directusFetch';
import {PUBLIC_PRERENDER} from '$env/static/public';
import {getAllowedStatus} from '$lib/js/directusFetch.js';
import {createCalendar} from '$lib/js/helpers';
import {getLang, getLocale} from '$lib/js/helpers';
import {icalLcEvents} from './queries.js';
import {parse} from '$lib/js/parseCms.js';

let pr;

if (PUBLIC_PRERENDER === 'ALL') {
  pr = true;
} else {
  pr = false;
}

export const prerender = pr;

export async function GET({params}) {
  const data = await directusFetch(icalLcEvents, {
    slug: params.slug,
    language: getLang(getLocale(params)),
    status: getAllowedStatus(),
  });

  const events = await parse(data.Events, 'misc', 'ical', params);

  const city = data.Local_Chapters[0].translations[0].city;

  const filename = `calendar.ics`;

  const calendar = createCalendar(events, params, city);

  return new Response(calendar, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename='${filename}'`,
    },
    status: 200,
  });
}
