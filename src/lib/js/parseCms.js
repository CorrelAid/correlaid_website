import * as parseModel from './parseCmsModels/index.js';
import _ from 'lodash';
import {gemImgUrl, processHtml, getLang, toCamelCase} from './helpers.js';
import {PUBLIC_ON_CMS_ERROR} from '$env/static/public';
import translations from '$lib/data/translations.js';
import {herosSchema, ctaGroupsSchema} from './parsing/schemas/builder.js';
import {processHeros, processCtaGroups} from './parsing/processing/builder.js';

export async function parseBuilder(builder) {
  const parsedBuilder = [];
  for (const section of builder) {
    if (section.collection !== 'custom_sections') {
      let schema;
      let processingFunction;
      if (section.collection === 'heros') {
        schema = herosSchema;
        processingFunction = processHeros;
      } else if (section.collection === 'cta_groups') {
        schema = ctaGroupsSchema;
        processingFunction = processCtaGroups;
      } else {
        throw Error('Unknown builder collection: ' + section.collection);
      }
      parsedSection['props'] = processingFunction(section.item);
      try {
        await schema.validate(parsedSection['props']);
      } catch (err) {
        console.group('Validation Error');
        console.error(err.message);
        console.error(err.name);
        console.error(JSON.stringify(parsedSection['props'], null, 4));
        console.groupEnd();
        if (PUBLIC_ON_CMS_ERROR === 'FAIL') {
          throw Error('Error while parsing CMS content');
        }
      }
      parsedSection['collection'] = toCamelCase(section.collection);
      parsedBuilder.push(parsedSection);
    } else {
      parsedBuilder.push({
        collection: toCamelCase(section.collection),
      });
    }
  }

  // console.log("here",parsedBuilder);
  return parsedBuilder;
}

function reportParseError(err, description, rawInput) {
  console.group('CMS PARSE ERROR: ' + description);
  console.error(err.message);
  console.error(err.stack);
  console.error(rawInput);
  console.groupEnd();
}

export function parseContent(rawSections, page) {
  if (!rawSections) {
    return;
  }

  const parsedContent = [];
  for (const rawSection of rawSections) {
    try {
      // Convert collection name to camelCase
      rawSection.collection = toCamelCase(rawSection.collection);
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
 * @param {string} type - name of the function in parseCmsModels that should be used to parse
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

export function parseProject(project, params) {
  const lang = getLang(params);
  let parsedProject;

  const projectOutputs = [];

  try {
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
    let description;

    if (
      project.translations[0].description != null &&
      project.translations[0].description !== '' &&
      project.translations[0].description !== undefined
    ) {
      description = processHtml(project.translations[0].description);
    } else {
      description = void 0;
    }

    let endDate;

    if (
      project.end_date !== null &&
      project.end_date !== '' &&
      project.end_date !== undefined
    ) {
      endDate = new Date(project.end_date);
    } else {
      if (project.end_date_predicted === undefined) {
        throw new Error('end_date_predicted is undefined');
      }
      endDate = new Date(project.end_date_predicted);
    }

    if (
      project.status === 'published_anon' ||
      project.status === 'preview_anon'
    ) {
      let organization;

      if (lang === 'de-DE') {
        organization = translations['de']['organization.anonymous'].text;
      } else {
        organization = translations['de']['organization.anonymous'].text;
      }
      parsedProject = {
        endDate: endDate,
        title: project.translations[0].title,
        teaser: project.translations[0].summary,
        description: description,
        organization: {
          name: organization,
        },
        projectOutputs: projectOutputs,
        podcastHref: project.podcast_href,
        postSlug: project.post_slug,
        projectContacts: projectContacts,
      };
    } else {
      if (project.Projects_Outputs.length > 0) {
        const outputTypes = [
          'webapp',
          'report',
          'article',
          'video',
          'project_documentation',
          'repository',
          'data',
        ];

        for (const outputType of outputTypes) {
          const outputs = project.Projects_Outputs.filter(
            (obj) => obj.output_type === outputType,
          );
          if (outputs && outputs.length > 0) {
            let i = 1;
            for (const output of outputs) {
              if (outputs.length > 1) {
                output['output_number'] = i;
              }
              projectOutputs.push(output);
              i++;
            }
          }
        }
      }

      if (project.Podcast) {
        project['podcastHref'] = project.Podcast.soundcloud_link;
      }
      if (project.Blog_Posts.length !== 0) {
        project['postSlug'] = project.Blog_Posts[0].translations.slug;
      }
      let organization;
      if (project.is_internal === true) {
        if (lang === 'de-DE') {
          organization = {
            name: translations['de']['organization.internalProject'].text,
          };
        } else {
          organization = {
            name: translations['en']['organization.internalProject'].text,
          };
        }
      } else {
        organization = {
          name: project.Organizations[0].Organizations_id.translations[0].name,
          description:
            project.Organizations[0].Organizations_id.translations[0]
              .description,
        };
      }

      parsedProject = {
        endDate: endDate,
        title: project.translations[0].title,
        teaser: project.translations[0].summary,
        description: description,
        organization: organization,
        projectOutputs: projectOutputs,
        podcastHref: project.podcast_href,
        postSlug: project.post_slug,
        projectContacts: projectContacts,
      };
    }

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
      parsedProject['localChapters'] = project.Local_Chapters.map(
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
    endDate: parsedProject.endDate,
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
      localChapter: localChapterPage.Local_Chapters[0],
      events: parseEntries(localChapterPage.Events, 'events'),
      projects: parseEntries(
        localChapterPage.Local_Chapters[0].Projects,
        'lcProjects',
        false,
        [params],
      ),
    };

    parsedLcPage['hero'] = parseModel.lcHeros(parsedLcPage['localChapter']);
    parsedLcPage['local_admins'] = parseEntries(
      parsedLcPage['localChapter'].local_administrators,
      'localAdministrators',
    );
    parsedLcPage['lcEmail'] = parsedLcPage['localChapter'].lc_email;

    parsedLcPage['description'] =
      parsedLcPage['localChapter'].translations[0].description;
    parsedLcPage['howToGetInTouch'] =
      parsedLcPage['localChapter'].translations[0].how_to_get_in_touch;
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
      contentCreators: parseEntries(
        blogPostPage.Blog_Posts[0].content_creators,
        'contentCreators',
      ),
      post: blogPostPage.Blog_Posts[0],
      titleImage: gemImgUrl(blogPostPage.Blog_Posts[0].title_image.id),
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
        parsedPerson['img'] = gemImgUrl(
          person.person_id.image.id,
          'fit=cover&width=200&height=200&quality=80',
        );
        parsedPerson['imageDesc'] = person.person_id.image.description;
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
