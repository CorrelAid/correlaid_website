import * as parseModel from './parse_cms_models';
import {PUBLIC_ON_CMS_ERROR} from '$env/static/public';

function reportParseError(err, description, rawInput) {
  console.group('CMS PARSE ERROR: ' + description);
  console.log(err.message);
  console.log(err.stack);
  console.log(rawInput);
  console.groupEnd();
  if (PUBLIC_ON_CMS_ERROR === 'FAIL') {
    throw Error('Error while parsing CMS content');
  }
}

export function parseContent(rawSections, page) {
  if (!rawSections) {
    return;
  }

  const parsedContent = [];
  for (const rawSection of rawSections) {
    try {
      const section = {
        collection: rawSection.collection,
        props: parseModel[rawSection.collection](rawSection),
      };
      if (section.collection === 'heros') {
        section.sort = rawSection.sort;
      }
      if (section.collection === 'contacts') {
        section.item = {hr: rawSection.item.hr};
      }
      if (section.collection === 'wysiwyg') {
        section.sort = rawSection.sort;
      }
      parsedContent.push(section);
    } catch (err) {
      reportParseError(
        err,
        `Error parsing ${rawSection.collection} on page ${page}`,
        rawSection,
      );
    }
  }
  return parsedContent;
}

export function parseEntries(rawEntries, type, logInputOnError = true) {
  const parsedEntries = [];
  for (const rawEntry of rawEntries) {
    try {
      const entry = parseModel[type](rawEntry);
      parsedEntries.push(entry);
    } catch (err) {
      if (logInputOnError) {
        reportParseError(err, `For type ${type}`, rawEntry);
      } else {
        reportParseError(err, `For type ${type}`);
      }
    }
  }
  return parsedEntries;
}

export function parseProject(project) {
  let parsedProject;
  try {
    const projectLinks = {};

    if (project.Projects_Outputs.length !== 0) {
      projectLinks['repo'] = project.Projects_Outputs[0].url;
    }

    if (project.Podcast) {
      projectLinks['podcast_href'] = project.Podcast.soundcloud_link;
    }
    if (project.Posts.length !== 0) {
      projectLinks['post_slug'] = project.Posts[0].translations.slug;
    }

    const projectContacts = [];
    for (const person of project.People) {
      const parsedPerson = {
        name: person.People_id.name,
      };
      if (
        person.People_id.translations[0] &&
        person.People_id.translations[0].pronouns
      ) {
        parsedPerson[
          'pronouns'
        ] = `(${person.People_id.translations[0].pronouns})`;
      }
      const parsedLinks = {name: person.People_id.name};

      for (const link of [
        'website',
        'linkedin',
        'mastodon',
        'twitter',
        'github',
      ]) {
        if (person.People_id[link]) {
          parsedLinks[link] = person.People_id[link];
        }
      }

      parsedPerson['links'] = parsedLinks;
      projectContacts.push(parsedPerson);
    }

    parsedProject = {
      title: project.translations[0].title,
      teaser: project.translations[0].summary,
      description: project.translations[0].description,
      organization: {
        name: project.Organizations[0].Organizations_id.translations[0].name,
        description:
          project.Organizations[0].Organizations_id.translations[0].description,
      },
      projectLinks: projectLinks,
      projectContacts: projectContacts,
    };
    if (project.Local_Chapters.length > 0) {
      parsedProject['Local_Chapters'] = project.Local_Chapters.map(
        (lc) => lc.Local_Chapters_id.translations[0].city,
      );
    }
  } catch (err) {
    reportParseError(err, 'For Project page', project);
  }
  return parsedProject;
}

export function anonymizeProject(parsedProject) {
  const anonymizedProject = {
    title: parsedProject.title,
    teaser: parsedProject.teaser,
    description: parsedProject.description,
    organization: void 0,
    projectLinks: {},
    projectContacts: [],
  };
  return anonymizedProject;
}

export function parseLocalChapterPage(localChapterPage) {
  let parsedLcPage;
  try {
    parsedLcPage = {
      local_chapter: localChapterPage.Local_Chapters[0],
      events: parseEntries(localChapterPage.Events, 'events'),
      projects: parseEntries(
        localChapterPage.Local_Chapters[0].Projects,
        'lcProjects',
      ),
    };

    parsedLcPage['hero'] = parseModel.lcHeros(parsedLcPage['local_chapter']);
    parsedLcPage['local_admins'] = parseEntries(
      parsedLcPage['local_chapter'].local_administrators,
      'local_administrators',
    );
    parsedLcPage['lcEmail'] = parsedLcPage['local_chapter'].lc_email;
    parsedLcPage['description'] =
      parsedLcPage['local_chapter'].translations[0].description;
    parsedLcPage['howToGetInTouch'] =
      parsedLcPage['local_chapter'].translations[0].how_to_get_in_touch;
  } catch (err) {
    reportParseError(err, 'For local chapter page', localChapterPage);
  }

  return parsedLcPage;
}

/*
 * Parses all the elements from an event page that could cause an error.
 * This means that elements that will show up with invalid values or will be missing
 * are not considered at this point. In particular missing elements might be undefined
 * and will be rendered as empty text and incorrect dates will yield the string representation
 * 'Invalid Date' (as per default js Date functionality).
 */
export function parseEventPage(eventPage) {
  const parsedEventPage = eventPage.Events[0];
  if (eventPage.Events[0]['registration_link']) {
    try {
      parsedEventPage['root'] = new URL(
        parsedEventPage['registration_link'],
      ).hostname.replace('www.', '');
    } catch (err) {
      reportParseError(err, 'For event page', eventPage);
    }
  }

  return parsedEventPage;
}

/*
 * Parses all the elements from a blog post page that could cause an error.
 * This means that elements that will show up with invalid values or will be missing
 * are not considered at this point. In particular missing elements might be undefined
 * and will be rendered as empty text and incorrect dates will yield the string representation
 * 'Invalid Date' (as per default js Date functionality).
 */
export function parseBlogPostPage(blogPostPage) {
  let parsedBlogPostPage;

  try {
    parsedBlogPostPage = {
      pubDate: blogPostPage.Posts[0].pubdate,
      contentAllLanguages: blogPostPage.Posts[0].translations,
      content_creators: parseEntries(
        blogPostPage.Posts[0].content_creators,
        'content_creators',
      ),
      post: blogPostPage.Posts[0],
    };
    if (typeof parsedBlogPostPage.contentAllLanguages === 'undefined') {
      throw new Error('Blog post does not contain content in any language');
    }
  } catch (err) {
    reportParseError(err, 'For blog post page', blogPostPage);
  }
  return parsedBlogPostPage;
}
