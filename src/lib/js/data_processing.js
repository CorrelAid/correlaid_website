import _ from 'lodash';

export function unpack_events(event, date, part = false) {
  // deep copy
  const obj = JSON.parse(JSON.stringify(event));
  obj.date = date.date;
  obj.start_time = date.start_time;
  obj.end_time = date.end_time;
  if (part != false) {
    obj.title = event.title + `- Part ${part}`;
  }

  return obj;
}

export function filterByChapter(data, chapter) {
  return _.filter(data, (obj) => {
    if (chapter === 'Global') {
      return _.isEmpty(_.get(obj, 'local_chapters', []));
    } else {
      return (
        _.get(
          obj,
          'local_chapters[0].Local_Chapters_id.translations[0].city',
        ) === chapter
      );
    }
  });
}

export function filterByTag(data, tags) {
  return data.filter((object) => {
    const objectTags = object.tags || [];
    if (!Array.isArray(tags)) tags = [tags];
    return tags.every((tag) => objectTags.includes(tag));
  });
}

export function filterBy(kind, objects, targetType) {
  return _.filter(objects, (object) => {
    return object && object[kind] === targetType;
  });
}
