import {Feed} from 'feed';
import directus_fetch from '$lib/js/directus_fetch';
import {getAllowedStatus} from '$lib/js/directus_fetch.js';
import {handle_lang, get_locale} from '$lib/js/helpers';
import {get_lang} from '$lib/js/helpers';
import {blogQuery} from './queries.js';
import {parseEntries} from '$lib/js/parse_cms.js';

export async function GET({params}) {
  const feed = new Feed({
    title: 'CorrelAid Blog',
    id: `https://correlaid.org/${get_locale(params)}`,
    link: `https://correlaid.org/${get_locale(params)}/rss.xml`,
    language: `${get_locale(params)}`,
    copyright: `${new Date().getFullYear()} CorrelAid`,
  });

  const data = await directus_fetch(blogQuery, {
    language: get_lang(params),
    status: getAllowedStatus(),
  });

  const posts = handle_lang(data.Blog_Posts, params);

  const parsed_posts = parseEntries(posts, 'blog_posts');

  for (const post of parsed_posts) {
    feed.addItem({
      title: post.title,
      author: post.content_creators
        .map((creator) => creator.Content_Creators_id.person.name)
        .filter((name) => name)
        .join(', '),
      description: post.teaser,
      link: `https://correlaid.org${params.locale == 'en' ? '/en' : ''}/blog/${
        post.slug
      }`,
      custom_elements: [{languages: post.langs.join(', ')}],
    });
  }

  return new Response(feed.rss2({indent: true}));
}
