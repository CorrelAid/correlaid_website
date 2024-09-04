import _ from 'lodash';
import {
  genImageSrc,
  translate,
  getTranslation,
  genWebsiteUrl,
} from '../../helpers.js';

export function processPersonLinks(person) {
  const links = _.pick(person, ['website', 'linkedin', 'mastodon', 'github']);
  return links;
}

export function processContentCreators(data) {
  return _.map(data, (creator) => {
    return {
      name: creator.Content_Creators_id.person.name,
    };
  });
}

export function processPeople(data, personOnly) {
  const person = personOnly === false ? data.person : data;

  const links = processPersonLinks(person);

  const personParams = {
    name: person.name,
    links: links,
  };

  if (person.image) {
    personParams.imageSrc = genImageSrc(
      person.image.id,
      'fit=cover&width=200&height=200&quality=80',
    );
    personParams.imageDesc = person.image.description;
    personParams.imageAlt = person.name;
  }
  if (person.translations[0]) {
    personParams.pronouns = person.translations[0].pronouns;
  }

  if (personOnly === false) {
    personParams.email = data.email || person.email;
    personParams.position = data.translations[0].position;
    personParams.description = data.translations[0].description;
  } else {
    personParams.email = person.email;
  }

  return personParams;
}

export function processOrganizations(project, locale, single) {
  let procOrganization;
  let description;
  if (project.is_internal === true) {
    procOrganization = translate(
      locale,
      'organization.internalProject',
      {},
    ).text;
    description = translate(
      locale,
      'organization.internalProjectDescription',
      {},
    ).text;
  } else if (
    project.status === 'published_anon' ||
    project.status === 'preview_anon'
  ) {
    procOrganization = translate(locale, 'organization.anonymous', {}).text;
    description = translate(
      locale,
      'organization.anonymousOrganizationDescription',
      {},
    ).text;
  } else {
    description =
      project.Organizations[0].Organizations_id.translations[0].description;
    procOrganization =
      project.Organizations[0].Organizations_id.translations[0].name;
  }

  if (single === true) {
    return {
      name: procOrganization,
      description: description,
    };
  }

  return procOrganization;
}

export function processProjectOutputs(project, locale, lang) {
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
  return projectOutputs;
}
