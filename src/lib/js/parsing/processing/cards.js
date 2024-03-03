import {gemImgUrl} from '../../helpers.js';
import {
  translate,
  getLocale,
  toTitleCase,
  genWebsiteUrl,
  getTranslation,
} from '../../helpers.js';
import {
  processContentCreators,
  processLocalChapters,
} from './processingHelpers.js';
import _ from 'lodash';

export function processBlogPosts(post) {
  return {
    langs: post.langs,
    pubdate: post.publication_datetime,
    slug: _.get(post, 'translations.slug'),
    imageAlt: _.get(post, 'translations.image_alt'),
    title: _.get(post, 'translations.title'),
    teaser: _.get(post, 'translations.teaser'),
    imageUrl: gemImgUrl(_.get(post, 'title_image.id')),
    imageDesc: _.get(post, 'title_image.description'),
    contentCreators: processContentCreators(post.content_creators),
  };
}

export function processPodcastEpisodes(episode) {
  const parsedEpisode = _.pick(episode, [
    'title',
    'description',
    'image_alt',
    'soundcloud_link',
    'publication_datetime',
    'languages',
    'content_creators',
  ]);
  return {
    ...parsedEpisode,
    imageUrl: episode.image ? gemImgUrl(episode.image.id) : void 0,
    contentCreators: processContentCreators(episode.content_creators),
  };
}

export function processEvents(event) {
  const localChapters = processLocalChapters(event);

  const parsedEvent = _.pick(event, [
    'slug',
    'title',
    'teaser',
    'date',
    'tags',
    'type',
    'language',
  ]);

  return {
    ...parsedEvent,
    date: new Date(event.date),
    endDate: event.end_date ? new Date(event.end_date) : void 0,
    localChapters,
  };
}

export function processProjects(project, params) {
  const locale = getLocale(params);
  const lang = locale === 'de' ? 'de-DE' : 'en-US';

  let organization;
  if (project.is_internal === true) {
    organization = translate(locale, 'organization.internalProject', {}).text;
  } else if (
    project.status === 'published_anon' ||
    project.status === 'preview_anon'
  ) {
    organization = translate(locale, 'organization.anonymous', {}).text;
  } else {
    organization = _.get(
      project,
      'Organizations[0].Organizations_id.translations[0].name',
    );
  }

  const projectTypes = project.translations[0].type.map((str) =>
    toTitleCase(str.replace('_', ' ')),
  );
  const dataTypes = project.translations[0].data.map((str) =>
    toTitleCase(str.replace('_', ' ')),
  );

  const projectOutputs = [];
  if (project.Blog_Posts.length !== 0) {
    project.Blog_Posts.forEach((blogPost) => {
      const translation = getTranslation(blogPost.Blog_Posts_id, lang);
      const slug = translation.slug;
      const url = genWebsiteUrl(translate(locale, 'navbar.blog', {}).url, slug);
      projectOutputs.push({url, outputType: 'blogPost', outputNumber: 1});
    });
  }

  if (project.Podcast !== null) {
    projectOutputs.push({
      url: _.get(project, 'Podcast.soundcloud_link'),
      outputType: 'podcastEpisode',
      outputNumber: 1,
    });
  }

  if (project.Projects_Outputs.length !== 0) {
    const uniqueOutputTypes = new Set(
      project.Projects_Outputs.map((output) => output.output_type),
    );
    uniqueOutputTypes.forEach((outputType) => {
      const outputs = project.Projects_Outputs.filter(
        (obj) => obj.output_type === outputType,
      );
      let outputNumber = 1;
      outputs.forEach((output) => {
        projectOutputs.push({
          url: output.url,
          outputType: output.output_type,
          outputNumber: outputs.length > 1 ? outputNumber++ : 0,
        });
      });
    });
  }

  let href;
  if (project.subpage === true) {
    return genWebsiteUrl(
      translate(locale, 'navbar.using_data.project_database', {}).url,
      project.project_id,
    );
  } else href = void 0;

  return {
    title: _.get(project, 'translations[0].title'),
    summary: _.get(project, 'translations[0].summary'),
    href: href,
    projectTypes: projectTypes,
    dataTypes: dataTypes,
    endDate: project.end_date
      ? new Date(project.end_date)
      : new Date(project.end_date_predicted),
    organization: organization,
    isInternal: project.is_internal,
    localChapters: processLocalChapters(project),
    projectOutputs: projectOutputs,
  };
}
