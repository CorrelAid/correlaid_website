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
      name: _.get(creator, 'Content_Creators_id.person.name'),
    };
  });
}
