import directusFetch from '$lib/js/directusFetch';
import {PUBLIC_PRERENDER} from '$env/static/public';
import {getAllowedStatus} from '$lib/js/directusFetch.js';
import {getLang, getLocale} from '$lib/js/helpers';
import {blogQuery} from './queries.js';
import {parse} from '$lib/js/parseCms.js';
import he from 'he';

let pr;

if (PUBLIC_PRERENDER === 'ALL') {
  pr = true;
} else {
  pr = false;
}

export const prerender = pr;

export async function GET({params}) {
  const feedTitle = 'CorrelAid Blog';
  const feedLink = `https://correlaid.org${
    params.locale == 'en' ? '/en' : ''
  }/rss.xml`;
  const feedLanguage = `${getLocale(params)}`;
  const feedCopyright = `${new Date().getFullYear()} CorrelAid`;

  let xmlString = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${he.encode(feedTitle)}</title>
      <link>${he.encode(feedLink)}</link>
      <description>${he.encode(feedTitle)}</description>
      <language>${he.encode(feedLanguage)}</language>
      <atom:link href="${feedLink}" rel="self" type="application/rss+xml" />

      <copyright>${he.encode(feedCopyright)}</copyright>
  `;

  const data = await directusFetch(blogQuery, {
    language: getLang(getLocale(params)),
    status: getAllowedStatus(),
  });

  const parsedPosts = await parse(
    data.Blog_Posts,
    'cards',
    'blogPosts',
    params,
  );

  for (const post of parsedPosts) {
    const title = he.encode(post.title);
    const author = post.contentCreators
      .map((creator) => creator.name)
      .join(', ');
    const description = he.encode(post.teaser);
    const link = `https://correlaid.org${
      params.locale == 'en' ? '/en' : ''
    }/blog/${post.slug}`;
    const languages = post.langs.join(', ');

    xmlString += `
      <item>
        <title>${title}</title>
        <author>${author}</author>
        <description>${description}</description>
        <link>${he.encode(link)}</link> 
        <languages>${he.encode(languages)}</languages> 
        <guid>${he.encode(link)}</guid>

      </item>
    `;
  }

  xmlString += `
    </channel>
  </rss>
  `;

  return new Response(xmlString, {
    headers: {'Content-Type': 'application/xml'},
  });
}
