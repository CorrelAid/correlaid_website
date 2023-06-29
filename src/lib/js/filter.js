import _ from 'lodash';

export function filterByMultiple(data, filter_values, property) {
  return data.filter((object) => {
    const objectsProperty = object[property];

    return filter_values.every((single) => {
      if (single === 'global' && property === 'correlaidx') {
        return objectsProperty.length === 0;
      } else {
        return objectsProperty
          .map((entry) => entry.toLowerCase())
          .includes(single);
      }
    });
  });
}

function filterDefinedBy(property, objects, value) {
  return _.filter(objects, (object) => {
    return object && object[property].toLowerCase() === value.toLowerCase();
  });
}

export function filterStringSearch(searchTerm, searchOptions, objects) {
  return _.filter(objects, (object) => {
    let bool = false;
    for (const item of searchOptions) {
      if (item.multiple === true) {
        for (const single of object[item.name]) {
          if (single.toLowerCase().includes(searchTerm.toLowerCase())) {
            bool = true;
          }
        }
      } else {
        if (
          object &&
          object[item.name].toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          bool = true;
        }
      }
    }
    return bool;
  });
}

export function filter(data, selects, searchTerm, searchOptions) {
  let data_ = structuredClone(data);
  if (searchTerm) {
    data_ = filterStringSearch(searchTerm, searchOptions, data_);
  }

  for (const select of selects) {
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

export function setUrlParams(url, selects) {
  const newUrl = new URL(url);
  for (const select of selects) {
    if (select.value) {
      if (select.multiple === true) {
        newUrl?.searchParams?.set(
          select.param,
          _.chain(select.value).flatMap('value').value(),
        );
      } else {
        newUrl?.searchParams?.set(select.param, select.value.value);
      }
    } else {
      newUrl?.searchParams?.delete(select.param);
    }
  }
  // https://dev.to/mohamadharith/mutating-query-params-in-sveltekit-without-page-reloads-or-navigations-2i2b
  return newUrl;
}

function genValue(value, values, items) {
  if (values.includes(value)) {
    return {
      value: value,
      label: _.find(items, {value: value}).label,
      index: values.indexOf(value),
    };
  }
}

export function extractUrlSearchParams(searchParams, values, selects) {
  for (const key in values) {
    if (values.hasOwnProperty(key)) {
      if (searchParams.get(key)) {
        const value_ = searchParams.get(key);
        const items = _.find(selects, {param: key}).items;
        const values_ = _.chain(items).flatMap('value').value();
        if (_.find(selects, {param: key}).multiple === true) {
          const value_lst = value_.split(',');
          const arr = [];
          for (let i = 0; i < value_lst.length; i++) {
            arr.push(genValue(value_lst[i], values_, items));
          }
          values[key] = arr;
        } else {
          values[key] = genValue(value_, values_, items);
        }
      }
    }
  }
}

function packMap(data, param) {
  return _.chain(data)
    .flatMap(param)
    .compact()
    .uniq()
    .value()
    .map((value, i) => ({
      value: value.toLowerCase(),
      index: i,
      label: value.replace(/_/g, ' '),
    }));
}

export function genDropdownLists(orig_data, selects) {
  const chapterList = packMap(orig_data, 'correlaidx');
  chapterList.push({value: 'global', label: 'Global'});
  _.find(selects, {param: 'correlaidx'}).items = chapterList;

  const langList = [
    {value: 'en-US', label: 'en'},
    {value: 'de-DE', label: 'de'},
  ];
  _.find(selects, {param: 'language'}).items = langList;

  // _.find(selects, { param: 'tags' }).items = _.chain(orig_data)
  //   .flatMap('tags')
  //   .uniq()
  //   .value();

  const typeList = packMap(orig_data, 'type');
  _.find(selects, {param: 'type'}).items = typeList;

  return selects;
}
