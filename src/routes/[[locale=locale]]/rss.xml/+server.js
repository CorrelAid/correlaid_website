import directus_fetch from '$lib/js/directus_fetch';
import {getAllowedStatus} from '$lib/js/directus_fetch.js';
import {handle_lang, get_locale} from '$lib/js/helpers';
import {get_lang} from '$lib/js/helpers';
import {blogQuery} from './queries.js';
import {parseEntries} from '$lib/js/parse_cms.js';

export async function GET({params}) {
  const feedTitle = 'CorrelAid Blog';
  const feedLink = `https://correlaid.org/${get_locale(params)}/rss.xml`;
  const feedLanguage = `${get_locale(params)}`;
  const feedCopyright = `${new Date().getFullYear()} CorrelAid`;

  let xmlString = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>${feedTitle}</title>
      <link>${feedLink}</link>
      <description>${feedTitle}</description>
      <language>${feedLanguage}</language>
      <copyright>${feedCopyright}</copyright>
  `;

  const data = await directus_fetch(blogQuery, {
    language: get_lang(params),
    status: getAllowedStatus(),
  });

  const posts = handle_lang(data.Blog_Posts, params);

  const parsed_posts = parseEntries(posts, 'blog_posts');

  for (const post of parsed_posts) {
    const title = post.title;
    const author = post.content_creators
      .map((creator) => creator.Content_Creators_id.person.name)
      .filter((name) => name)
      .join(', ');
    const description = post.teaser;
    const link = `https://correlaid.org${
      params.locale == 'en' ? '/en' : ''
    }/blog/${post.slug}`;
    const languages = post.langs.join(', ');

    xmlString += `
      <item>
        <title>${title}</title>
        <author>${author}</author>
        <description>${description}</description>
        <link>${link}</link>
        <languages>${languages}</languages>
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
