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

export function filterByChapters(data, chapter) {
  if (chapter === 'Global') {
    return data.filter((obj) => obj.correlaidx.length === 0);
  } else {
    return data.filter((obj) => obj.correlaidx.includes(chapter));
  }
}

export function filterByMultiple(data, filter_values, property) {
  return data.filter((object) => {
    const objectsProperty = object[property];
    return filter_values.every((single) => {
      if (single === 'Global' && property === 'correlaidx') {
        return objectsProperty.length === 0;
      } else {
        return objectsProperty.includes(single);
      }
    });
  });
}

export function filterDefinedBy(property, objects, value) {
  return _.filter(objects, (object) => {
    return object && object[property] === value;
  });
}
