import directus_fetch from '$lib/js/directus_fetch';
import {PUBLIC_PRERENDER} from '$env/static/public';
import {getAllowedStatus} from '$lib/js/directus_fetch.js';
import {createCalendar} from '$lib/js/helpers';
import {get_lang} from '$lib/js/helpers';
import {icalLcEvents} from './queries.js';
import {parseEntries} from '$lib/js/parse_cms.js';

let pr;

if (PUBLIC_PRERENDER === 'ALL') {
  pr = true;
} else {
  pr = false;
}

export const prerender = pr;

export async function GET({params}) {
  const data = await directus_fetch(icalLcEvents, {
    slug: params.slug,
    language: get_lang(params),
    status: getAllowedStatus(),
  });

  const Events = parseEntries(data.Events, 'icalEvents');

  const city = data.Local_Chapters[0].translations[0].city;
  const email = data.Local_Chapters[0].lc_email;

  const filename = `correlaidx${city}_events.ical`;

  const calendar = createCalendar(Events, params, city, email);

  return new Response(calendar, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename='${filename}'`,
    },
    status: 200,
  });
}
