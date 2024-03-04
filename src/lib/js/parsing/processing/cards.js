import {gemImgUrl} from '../../helpers.js';
import {
  translate,
  transformTypes,
  genWebsiteUrl,
  getTranslation,
  genDate,
} from '../../helpers.js';
import {
  processContentCreators,
  processLocalChapters,
} from './processingHelpers.js';

export function processBlogPosts(post, locale) {
  const slug = post.translations.slug;
  const href = genWebsiteUrl(translate(locale, 'navbar.blog', {}).url, slug);
  return {
    langs: post.langs,
    pubDate: genDate(post.publication_datetime, locale, true),
    href,
    imageAlt: post.translations.image_alt,
    title: post.translations.title,
    teaser: post.translations.teaser,
    imageUrl: gemImgUrl(post.title_image.id),
    imageDesc: post.title_image.description,
    contentCreators: processContentCreators(post.content_creators),
  };
}

export function processPodcastEpisodes(episode, locale) {
  return {
    title: episode.title,
    imageAlt: episode.image_alt,
    langs: [episode.language],
    pubDate: genDate(episode.publication_datetime, locale, true),
    href: episode.soundcloud_link,
    teaser: episode.description,
    imageUrl: episode.image ? gemImgUrl(episode.image.id) : void 0,
    contentCreators: processContentCreators(episode.content_creators),
  };
}

export function processEvents(event, locale) {
  const localChapters = processLocalChapters(event);

  const slug = event.slug;
  const href = genWebsiteUrl(translate(locale, 'navbar.events', {}).url, slug);
  const endDate = event.end_date ? genDate(event.end_date, locale) : void 0;

  return {
    title: event.title,
    teaser: event.teaser,
    language: event.language,
    tags: transformTypes(event.tags),
    type: transformTypes([event.type])[0],
    href,
    procDate: genDate(event.date, locale, true),
    date: new Date(event.date),
    endDate: endDate,
    localChapters,
  };
}

export function processProjects(project, locale) {
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
    organization =
      project.Organizations[0].Organizations_id.translations[0].name;
  }

  const projectTypes = transformTypes(project.translations[0].type);
  const dataTypes = transformTypes(project.translations[0].data);

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
      url: project.Podcast.soundcloud_link,
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
    title: project.translations[0].title,
    summary: project.translations[0].summary,
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
