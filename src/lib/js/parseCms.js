import _ from 'lodash';
import yup from 'yup';
import {toCamelCase, getLocale} from './helpers.js';
import {PUBLIC_ON_CMS_ERROR} from '$env/static/public';

import {
  customSectionsSchema,
  herosSchema,
  ctaGroupsSchema,
  wysiwygSchema,
  quoteCarouselsSchema,
  contactsSchema,
  timelineSchema,
  buttonsSchema,
  iconsSchema,
} from './parsing/schemas/builder.js';

import {
  blogPostsSchema,
  podcastEpisodesSchema,
  eventsSchema,
  projectsSchema,
  expertsSchema,
  workshopsSchema,
  localChaptersSchema,
  awardsSchema,
  administratorsSchema,
  partnersSchema,
  jobsSchema,
} from './parsing/schemas/cards.js';

import {
  eventSchema,
  blogPostSchema,
  projectSchema,
  jobSchema,
} from './parsing/schemas/single.js';

import {
  processLocalChaptersMap,
  processLocalChapterPage,
  processIcal,
} from './parsing/processing/misc.js';

import {
  processCustomSections,
  processHeros,
  processCtaGroups,
  processWysiwyg,
  processQuoteCarousels,
  processContacts,
  processTimelines,
  processButtons,
  processIcons,
} from './parsing/processing/builder.js';

import {
  processBlogPosts,
  processPodcastEpisodes,
  processEvents,
  processProjects,
  processExperts,
  processWorkshops,
  processLocalChapters,
  processAwards,
  processAdministrators,
  processPartners,
  processJobs,
} from './parsing/processing/cards.js';

import {
  processEvent,
  processBlogPost,
  processProject,
  processJob,
} from './parsing/processing/single.js';

import {
  localChaptersMapSchema,
  localChapterPageSchema,
  icalSchema,
} from './parsing/schemas/misc.js';

async function parsing(
  data,
  schema,
  processingFunction,
  type,
  secType,
  locale,
) {
  const processedData = processingFunction(data, locale);
  try {
    const validatedData = await schema.validate(processedData, {strict: true});
    return validatedData;
  } catch (err) {
    console.group('Validation Error');
    console.error(err.message);
    console.error(err.name);
    console.error(JSON.stringify(processedData, null, 4));
    console.groupEnd();
    if (PUBLIC_ON_CMS_ERROR === 'FAIL') {
      throw Error(
        'Error while parsing CMS content for ' + type + ' ' + secType,
      );
    }
  }
}

export async function parse(data, type, secType = '', params = {}) {
  const locale = getLocale(params);
  let schema;
  let processingFunction;
  let sortingFunction;
  switch (type) {
    case 'builder':
      const parsedBuilder = [];
      const checkMultipleCustomSections =
        _.filter(data, {collection: 'custom_sections'}).length > 1;
      for (const section of data) {
        const parsedSection = {
          collection: toCamelCase(section.collection),
          sort: section.sort,
        };
        switch (section.collection) {
          case 'custom_sections':
            schema =
              checkMultipleCustomSections === true
                ? customSectionsSchema
                : yup.object();
            processingFunction = processCustomSections;
            break;
          case 'heros':
            schema = herosSchema;
            processingFunction = processHeros;
            break;
          case 'cta_groups':
            schema = ctaGroupsSchema;
            processingFunction = processCtaGroups;
            break;
          case 'wysiwyg':
            schema = wysiwygSchema;
            processingFunction = processWysiwyg;
            break;
          case 'quote_carousels':
            schema = quoteCarouselsSchema;
            processingFunction = processQuoteCarousels;
            break;
          case 'contacts':
            schema = contactsSchema;
            processingFunction = processContacts;
            break;
          case 'timelines':
            schema = timelineSchema;
            processingFunction = processTimelines;
            break;
          case 'buttons':
            schema = buttonsSchema;
            processingFunction = processButtons;
            break;
          case 'icons':
            schema = iconsSchema;
            processingFunction = processIcons;
            break;
          default:
            throw Error('Unknown builder collection: ' + section.collection);
        }
        parsedSection['props'] = await parsing(
          section.item,
          schema,
          processingFunction,
          type,
          section.collection,
        );
        parsedBuilder.push(parsedSection);
      }
      return parsedBuilder;
    case 'cards':
      switch (secType) {
        case 'blogPosts':
          schema = blogPostsSchema;
          processingFunction = processBlogPosts;
          break;
        case 'podcastEpisodes':
          schema = podcastEpisodesSchema;
          processingFunction = processPodcastEpisodes;
          break;
        case 'events':
          schema = eventsSchema;
          processingFunction = processEvents;
          break;
        case 'projects':
          schema = projectsSchema;
          processingFunction = processProjects;
          sortingFunction = function (projects) {
            return projects.sort((a, b) => b.endDate - a.endDate);
          };
          break;
        case 'experts':
          schema = expertsSchema;
          processingFunction = processExperts;
          break;
        case 'workshops':
          schema = workshopsSchema;
          processingFunction = processWorkshops;
          break;
        case 'localChapters':
          schema = localChaptersSchema;
          processingFunction = processLocalChapters;
          break;
        case 'awards':
          schema = awardsSchema;
          processingFunction = processAwards;
          break;
        case 'administrators':
          schema = administratorsSchema;
          processingFunction = processAdministrators;
          break;
        case 'partners':
          schema = partnersSchema;
          processingFunction = processPartners;
          break;
        case 'jobs':
          schema = jobsSchema;
          processingFunction = processJobs;
          break;
        default:
          throw Error('Unknown card type: ' + secType);
      }
      const parsedCards = [];

      for (const card of data) {
        const parsedCard = await parsing(
          card,
          schema,
          processingFunction,
          type,
          secType,
          locale,
        );
        parsedCards.push(parsedCard);
      }
      if (sortingFunction) {
        const sortedData = sortingFunction(parsedCards);
        return sortedData;
      }
      return parsedCards;
    case 'single':
      switch (secType) {
        case 'event':
          schema = eventSchema;
          processingFunction = processEvent;
          break;
        case 'blogPost':
          schema = blogPostSchema;
          processingFunction = processBlogPost;
          break;
        case 'project':
          schema = projectSchema;
          processingFunction = processProject;
          break;
        case 'job':
          schema = jobSchema;
          processingFunction = processJob;
          break;
        default:
          throw Error('Unknown single type: ' + secType);
      }
      return await parsing(
        data,
        schema,
        processingFunction,
        type,
        secType,
        locale,
      );
    case 'misc':
      switch (secType) {
        case 'localChaptersMap':
          schema = localChaptersMapSchema;
          processingFunction = processLocalChaptersMap;
          break;
        case 'localChapterPage':
          schema = localChapterPageSchema;
          processingFunction = processLocalChapterPage;
          break;
        case 'ical':
          schema = icalSchema;
          processingFunction = processIcal;
          break;
        default:
          throw Error('Unknown misc type: ' + secType);
      }
      return await parsing(
        data,
        schema,
        processingFunction,
        type,
        secType,
        locale,
      );
    default:
      throw Error('Unknown type: ' + type);
  }
}
