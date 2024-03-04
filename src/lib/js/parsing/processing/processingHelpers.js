import _ from 'lodash';
import {gemImgUrl} from '../../helpers.js';

export function processPersonLinks(person) {
  const links = _.pick(person, [
    'website',
    'twitter',
    'linkedin',
    'mastodon',
    'github',
  ]);
  return links;
}

export function processContentCreators(data) {
  return _.map(data, (creator) => {
    return {
      name: creator.Content_Creators_id.person.name,
    };
  });
}

export function processPeople(data) {
  const links = processPersonLinks(data.person);
  const personParams = {
    name: data.person.name,
    position: data.translations[0].position,
    description: data.translations[0].description,
    links: links,
  };

  if (data.person.image) {
    personParams.img = gemImgUrl(
      data.person.image.id,
      'fit=cover&width=200&height=200&quality=80',
    );
    personParams.imageDesc = data.person.image.description;
  }

  if (data.person.translations[0]) {
    personParams.pronouns = data.person.translations[0].pronouns;
  }

  personParams.email = data.email || data.person.email;

  return personParams;
}

export function processLocalChapters(event) {
  const localChapters = _.map(event.local_chapters, (lc) => {
    return {
      city: lc.Local_Chapters_id.translations[0].city,
      shortId: lc.Local_Chapters_id.short_id,
    };
  });

  return localChapters;
}
