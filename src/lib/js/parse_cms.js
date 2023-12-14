import * as parseModel from './parse_cms_models';
import _ from 'lodash';
import {gen_img_url, processHtml} from './helpers.js';
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

/**
 * Parses an array of raw entries of a given type.
 *
 * @param {Array} rawEntries - Array of raw entries.
 * @param {string} type - name of the function in parse_cms_models that should be used to parse
 *  the entries.
 * @param {boolean} logInputOnError - Flag whether the raw input should be logged in case of an error.
 *  Defaults to true, but should be set to false for sensitive data.
 * @param {Array} additionalParameters - Additional parameters that should be passed to the parsing
 *  function via the spread operator.
 */
export function parseEntries(
  rawEntries,
  type,
  logInputOnError = true,
  additionalParameters = [],
) {
  const parsedEntries = [];
  for (const rawEntry of rawEntries) {
    try {
      const entry = parseModel[type](rawEntry, ...additionalParameters);
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
      const repo = project.Projects_Outputs.find(
        (obj) => obj.output_type === 'repository',
      );
      if (repo) {
        projectLinks['repo'] = repo.url;
      }
    }

    if (project.Podcast) {
      projectLinks['podcast_href'] = project.Podcast.soundcloud_link;
    }
    if (project.Blog_Posts.length !== 0) {
      projectLinks['post_slug'] = project.Blog_Posts[0].translations.slug;
    }

    const projectContacts = [];
    for (const person of project.People) {
      const parsedPerson = {
        name: person.person_id.name,
      };
      if (
        person.person_id.translations[0] &&
        person.person_id.translations[0].pronouns
      ) {
        parsedPerson[
          'pronouns'
        ] = `(${person.person_id.translations[0].pronouns})`;
      }
      const parsedLinks = {name: person.person_id.name};

      for (const link of [
        'website',
        'linkedin',
        'mastodon',
        'twitter',
        'github',
      ]) {
        if (person.person_id[link]) {
          parsedLinks[link] = person.person_id[link];
        }
      }

      parsedPerson['links'] = parsedLinks;
      projectContacts.push(parsedPerson);
    }

    parsedProject = {
      title: project.translations[0].title,
      teaser: project.translations[0].summary,
      description: processHtml(project.translations[0].description),
      organization: {
        name: project.Organizations[0].Organizations_id.translations[0].name,
        description:
          project.Organizations[0].Organizations_id.translations[0].description,
      },
      projectLinks: projectLinks,
      projectContacts: projectContacts,
    };

    if (project.translations[0].type) {
      parsedProject['type'] = project.translations[0]['type'].map((str) =>
        str.replace('_', ' ').toLowerCase(),
      );
    }

    if (project.translations[0].data) {
      if (!_.isEmpty(project.translations[0].data)) {
        parsedProject['data'] = project.translations[0].data.map((str) =>
          str.replace('_', ' ').toLowerCase(),
        );
      }
    }
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

export function parseLocalChapterPage(localChapterPage, params) {
  let parsedLcPage;
  try {
    parsedLcPage = {
      local_chapter: localChapterPage.Local_Chapters[0],
      events: parseEntries(localChapterPage.Events, 'events'),
      projects: parseEntries(
        localChapterPage.Local_Chapters[0].Projects,
        'lcProjects',
        false,
        [params],
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
  parsedEventPage['description'] = processHtml(parsedEventPage.description);
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
      pubDate: blogPostPage.Blog_Posts[0].publication_datetime,
      contentAllLanguages: blogPostPage.Blog_Posts[0].translations,
      content_creators: parseEntries(
        blogPostPage.Blog_Posts[0].content_creators,
        'content_creators',
      ),
      post: blogPostPage.Blog_Posts[0],
      title_image: gen_img_url(blogPostPage.Blog_Posts[0].title_image.id),
    };
    if (typeof parsedBlogPostPage.contentAllLanguages === 'undefined') {
      throw new Error('Blog post does not contain content in any language');
    }
    for (const post in parsedBlogPostPage.contentAllLanguages) {
      if (parsedBlogPostPage.contentAllLanguages.hasOwnProperty(post)) {
        parsedBlogPostPage.contentAllLanguages[post].text = processHtml(
          parsedBlogPostPage.contentAllLanguages[post].text,
        );
      }
    }
  } catch (err) {
    reportParseError(err, 'For blog post page', blogPostPage);
  }

  return parsedBlogPostPage;
}

export function parseJobPage(jobPage) {
  const parsedJobPage = {
    title: jobPage.Jobs[0].translations.title,
    summary: jobPage.Jobs[0].translations.summary,
    description: jobPage.Jobs[0].translations.description,
    location: jobPage.Jobs[0].location,
    language: jobPage.Jobs[0].language,
    deadline: new Date(jobPage.Jobs[0].deadline),
    salary: jobPage.Jobs[0].salary,
    FTE: jobPage.Jobs[0].FTE,
    type: jobPage.Jobs[0].type,
  };

  if (jobPage.Jobs[0].tags) {
    parsedJobPage['tags'] = jobPage.Jobs[0].tags;
  } else {
    parsedJobPage['tags'] = [];
  }

  const colleagues = [];
  if (jobPage.Jobs[0].colleagues) {
    for (const person of jobPage.Jobs[0].colleagues) {
      const parsedPerson = {
        name: person.person_id.name,
      };
      if (person.person_id.image) {
        parsedPerson['img'] = gen_img_url(
          person.person_id.image.id,
          'fit=cover&width=200&height=200&quality=80',
        );
        parsedPerson['image_desc'] = person.person_id.image.description;
      }
      if (
        person.person_id.translations[0] &&
        person.person_id.translations[0].pronouns
      ) {
        parsedPerson[
          'pronouns'
        ] = `(${person.person_id.translations[0].pronouns})`;
      }
      const parsedLinks = {name: person.person_id.name};

      for (const link of [
        'website',
        'linkedin',
        'mastodon',
        'twitter',
        'github',
      ]) {
        if (person.person_id[link]) {
          parsedLinks[link] = person.person_id[link];
        }
      }

      parsedPerson['links'] = parsedLinks;
      colleagues.push(parsedPerson);
    }
  }
  parsedJobPage['colleagues'] = colleagues;
  return parsedJobPage;
}
