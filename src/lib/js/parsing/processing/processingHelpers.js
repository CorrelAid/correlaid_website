import _ from 'lodash';

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

export function processLocalChapters(event) {
  const localChapters = _.map(event.local_chapters, (lc) => {
    return {
      city: lc.Local_Chapters_id.translations[0].city,
      shortId: lc.Local_Chapters_id.short_id,
    };
  });

  return localChapters;
}
