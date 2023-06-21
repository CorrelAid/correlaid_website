import _ from 'lodash';
import {goto} from '$app/navigation';

function filterByMultiple(data, filter_values, property) {
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

function filterDefinedBy(property, objects, value) {
  return _.filter(objects, (object) => {
    return object && object[property] === value;
  });
}

export function filter(data, selects) {
  let data_ = structuredClone(data);
  console.log(selects);
  for (const select of selects) {
    console.log(select.value);
    if (select.value) {
      if (select.multiple === true) {
        const values = _.chain(select.value).flatMap('value').value();
        data_ = filterByMultiple(data_, values, select.param);
      } else {
        data_ = filterDefinedBy(select.param, data_, select.value.value);
      }
    }
  }
  return data_;
}

export function setFilterParams(url, selects) {
  const newUrl = new URL(url);
  for (const select of selects) {
    if (select.multiple === true) {
      newUrl?.searchParams?.set(
        select.param,
        _.chain(select.value).flatMap('value').value(),
      );
    }
    if (select.value) {
      newUrl?.searchParams?.set(select.param, select.value.value);
    }
  }

  goto(newUrl);
}

function fromParam(param, lst, searchParams) {
  const value_ = searchParams.get(param);
  // if (complex === true) {
  //   lst = _.chain(lst).flatMap('value').value();
  // }
  if (lst.includes(value_)) {
    return {
      value: value_,
      label: value_
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      index: lst.indexOf(value_),
    };
  }
}

export function extractUrlSearchParams(searchParams, selects) {
  for (const select of selects) {
    if (searchParams.get(select.param)) {
      if (select.multiple === true) {
        const paramValue = searchParams.get(select.param).split(',');
        const arr = [];
        for (let i = 0; i < paramValue.length; i++) {
          if (select.items.includes(paramValue[i])) {
            arr.push({
              value: paramValue[i],
              label: paramValue[i],
              index: select.items.indexOf(paramValue[i]),
            });
          }
        }
      } else {
        select.value = fromParam(select.param, select.items, searchParams);
      }
    }
  }
}
