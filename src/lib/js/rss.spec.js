import {createRssFeed} from '$lib/js/rss.js';
import {parse} from '$lib/js/parseCms.js';

describe('gen Rss', async () => {
  const data = [
    {
      publication_datetime: '2024-07-30T12:34:56Z',
      content_creators: [
        {
          Content_Creators_id: {
            person: {
              name: 'Jane Doe',
            },
          },
        },
        {
          Content_Creators_id: {
            person: {
              name: 'John Smith',
            },
          },
        },
      ],
      translations: [
        {
          title: 'Ein Einblickreicher Blogbeitrag',
          text: '<p>Am Samstag, <a href="https://google.com">Data Viz BBQ</a> </p>',
          slug: 'ein-einblickreicher-blogbeitrag',
          teaser: 'Dies ist ein Teaser des Blogbeitrags...',
        },
      ],
    },
    {
      publication_datetime: '2024-07-28T10:20:30Z',
      content_creators: [
        {
          Content_Creators_id: {
            person: {
              name: 'Alice Brown',
            },
          },
        },
      ],
      translations: [
        {
          title: 'Ein Faszinierender Artikel',
          text: '<p>Am Samstag, <a href="https://google.com">Data Viz BBQ</a> </p>',
          slug: 'ein-faszinierender-artikel',
          teaser: 'Dies ist ein Teaser des Artikels...',
        },
      ],
    },
  ];

  const entries = await parse(data, 'cards', 'rssEntry', {});
  test('generates german rss feed', () => {
    const locale = 'de';
    const rootConf = {
      feedTitle: 'CorrelAid Blog',
      feedDescription: 'CorrelAid Blog',
    };

    const res = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <channel>
      <title>CorrelAid Blog</title>
      <link>undefined</link>
      <description>CorrelAid Blog</description>
      <language>de</language>
      <atom:link href="undefined" rel="self" type="application/rss+xml" />
      <copyright>2024 CorrelAid</copyright>
  
      <item>
        <title>Ein Einblickreicher Blogbeitrag</title>
        <author>Jane Doe, John Smith</author>
        <pubDate>30. Juli 2024</pubDate>
        <description>Dies ist ein Teaser des Blogbeitrags...</description>
        <link>https://correlaid.org/blog/ein-einblickreicher-blogbeitrag</link> 
        <language>de</language> 
        <guid>https://correlaid.org/blog/ein-einblickreicher-blogbeitrag</guid>
        <content:encoded>&#x3C;html&#x3E;&#x3C;head&#x3E;&#x3C;/head&#x3E;&#x3C;body&#x3E;&#x3C;p&#x3E;Am Samstag, &#x3C;a href=&#x22;https://google.com&#x22;&#x3E;Data Viz BBQ&#x3C;/a&#x3E; &#x3C;/p&#x3E;&#x3C;/body&#x3E;&#x3C;/html&#x3E;</content:encoded>
      </item>
    
      <item>
        <title>Ein Faszinierender Artikel</title>
        <author>Alice Brown</author>
        <pubDate>28. Juli 2024</pubDate>
        <description>Dies ist ein Teaser des Artikels...</description>
        <link>https://correlaid.org/blog/ein-faszinierender-artikel</link> 
        <language>de</language> 
        <guid>https://correlaid.org/blog/ein-faszinierender-artikel</guid>
        <content:encoded>&#x3C;html&#x3E;&#x3C;head&#x3E;&#x3C;/head&#x3E;&#x3C;body&#x3E;&#x3C;p&#x3E;Am Samstag, &#x3C;a href=&#x22;https://google.com&#x22;&#x3E;Data Viz BBQ&#x3C;/a&#x3E; &#x3C;/p&#x3E;&#x3C;/body&#x3E;&#x3C;/html&#x3E;</content:encoded>
      </item>
    
    </channel>
  </rss>`;

    const feedEntries = createRssFeed(locale, entries, rootConf);

    expect(feedEntries).equals(res);
  });
});
