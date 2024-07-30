import directusFetch from '$lib/js/directusFetch';
import {PUBLIC_PRERENDER} from '$env/static/public';
import {getAllowedStatus} from '$lib/js/directusFetch.js';
import {getLang, getLocale} from '$lib/js/helpers';
import {createRssFeed} from '$lib/js/rss.js';
import {blogQuery} from './queries.js';
import {parse} from '$lib/js/parseCms.js';

let pr;

if (PUBLIC_PRERENDER === 'ALL') {
  pr = true;
} else {
  pr = false;
}

export const prerender = pr;

export async function GET({params}) {
  const data = await directusFetch(blogQuery, {
    language: getLang(getLocale(params)),
    status: getAllowedStatus(),
  });

  const entries = await parse(data.Blog_Posts, 'cards', 'rssEntry', params);

  const rootConf = {
    feedTitle: 'CorrelAid Blog',
    feedDescription: 'CorrelAid Blog',
  };

  const xmlString = await createRssFeed(getLocale(params), entries, rootConf);

  return new Response(xmlString, {
    headers: {'Content-Type': 'application/xml'},
  });
}
