import {gemImgUrl} from '../../helpers.js';
import {processContentCreators} from './processingHelpers.js';

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
  return {
    title: _.get(episode, 'title'),
    teaser: _.get(episode, 'description'),
    imageAlt: _.get(episode, 'image_alt'),
    slug: _.get(episode, 'soundcloud_link'),
    pubdate: _.get(episode, 'publication_datetime'),
    langs: [_.get(episode, 'languages')],
    imageUrl: episode.image ? gemImgUrl(episode.image.id) : void 0,
    contentCreators: processContentCreators(episode.content_creators),
  };
}

export function processEvents(event, ical = false) {
  const parsedEvent = _.pick(event, [
    'slug',
    'title',
    'teaser',
    'date',
    'tags',
    'type',
    'language',
  ]);

  parsedEvent.localChapters = _.map(event.local_chapters, (lc) => {
    return {
      city: lc.Local_Chapters_id.translations[0].city,
      shortId: lc.Local_Chapters_id.short_id,
    };
  });

  parsedEvent['date'] = new Date(event.date);
  if (event.end_date) {
    parsedEvent['endDate'] = new Date(event.end_date);
  }

  return parsedEvent;
}
