import he from 'he';

export function createRssFeed(locale, entries, rootConf) {
  rootConf.feedLanguage = locale;
  rootConf.feedCopyright = `${new Date().getFullYear()} CorrelAid`;
  rootConf.link =
    'https://correlaid.org' + (locale === 'en' ? '/en' : '') + '/rss.xml';

  // Encode all values in the rootConf object
  for (const key in rootConf) {
    if (rootConf.hasOwnProperty(key)) {
      rootConf[key] = he.encode(rootConf[key]);
    }
  }

  //   https://cyber.harvard.edu/rss/rss.html

  let xmlString = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <channel>
      <title>${rootConf.feedTitle}</title>
      <link>${rootConf.feedLink}</link>
      <description>${rootConf.feedDescription}</description>
      <language>${rootConf.feedLanguage}</language>
      <atom:link href="${rootConf.feedLink}" rel="self" type="application/rss+xml" />
      <copyright>${rootConf.feedCopyright}</copyright>
  `;

  for (const post of entries) {
    xmlString += `
      <item>
        <title>${post.title}</title>
        <author>${post.author}</author>
        <pubDate>${post.pubDate}</pubDate>
        <description>${post.description}</description>
        <link>${post.link}</link> 
        <language>${post.language}</language> 
        <guid>${post.link}</guid>
        <content:encoded>${post.content}</content:encoded>
      </item>
    `;
  }

  xmlString += `
    </channel>
  </rss>`;
  return xmlString;
}
