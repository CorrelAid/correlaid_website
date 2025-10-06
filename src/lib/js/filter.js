import _ from 'lodash';
/**

Filters an array of objects by multiple values in a specified property. object[property] has to be an array.
@param {Array} data - The array of objects to filter.
@param {Array} filterValues - The values to filter by.
@param {string} property - The property of the objects to filter on.
@returns {Array} - The filtered array of objects.
*/
export function filterByMultiple(data, filterValues, property) {
  return data.filter((object) => {
    if (object[property]) {
      const objectsProperty = object[property];
      return filterValues.every((contentElement) => {
        if (contentElement === 'global' && property === 'correlaidx') {
          return objectsProperty.length === 0;
        } else {
          return objectsProperty
            .map((entry) => entry.toLowerCase())
            .includes(contentElement.toLowerCase());
        }
      });
    }
  });
}

function filterDefinedBy(property, objects, value) {
  return _.filter(objects, (object) => {
    if (object[property]) {
      return object && object[property].toLowerCase() === value.toLowerCase();
    }
  });
}

function booleanFilter(property, objects, value) {
  return _.filter(objects, (object) => {
    if (value === true) {
      return object && object[property] === true;
    } else {
      return object;
    }
  });
}

export function filterStringSearch(searchTerm, searchOptions, objects) {
  return _.filter(objects, (object) => {
    for (const item of searchOptions) {
      if (object[item.searchProperty]) {
        if (item.multiple) {
          for (const contentElement of object[item.searchProperty]) {
            if (
              contentElement.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return true;
            }
          }
        } else {
          if (
            object &&
            object[item.searchProperty]
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          ) {
            return true;
          }
        }
      }
    }
  });
}

export function filter(data, selects, searchTerm, searchOptions, checkBoxes) {
  let data_ = structuredClone(data);
  if (checkBoxes) {
    for (const checkBox of checkBoxes) {
      data_ = booleanFilter(checkBox.param, data_, checkBox.value);
    }
  }

  if (searchTerm) {
    data_ = filterStringSearch(searchTerm, searchOptions, data_);
  }

  for (const select of selects) {
    if (select.value) {
      if (select.multiple) {
        const values = _.chain(select.value).flatMap('value').value();
        data_ = filterByMultiple(data_, values, select.param);
      } else {
        data_ = filterDefinedBy(select.param, data_, select.value.value);
      }
    }
  }
  return data_;
}
export function setUrlParams(
  url,
  selects,
  checkBoxes,
  viewType,
  searchTerm,
  currentPage = null,
) {
  const newUrl = new URL(url);
  for (const checkBox of checkBoxes) {
    if (checkBox.value === true) {
      newUrl.searchParams?.set(checkBox.param, checkBox.value);
    } else {
      newUrl.searchParams?.delete(checkBox.param);
    }
  }
  for (const select of selects) {
    if (select.value) {
      if (select.multiple) {
        newUrl.searchParams?.set(
          select.param,
          _.chain(select.value).flatMap('value').value(),
        );
      } else {
        newUrl.searchParams?.set(select.param, select.value.value);
      }
    } else {
      newUrl.searchParams?.delete(select.param);
    }
  }
  if (viewType) {
    newUrl.searchParams?.set('viewType', viewType);
  }
  if (searchTerm && searchTerm.trim() !== '') {
    newUrl.searchParams?.set('search', searchTerm.trim());
  } else {
    newUrl.searchParams?.delete('search');
  }
  // Handle pagination
  if (currentPage !== null) {
    if (currentPage === 0) {
      newUrl.searchParams?.delete('page');
    } else {
      newUrl.searchParams?.set('page', (currentPage + 1).toString());
    }
  }
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
  // Return null if value is not found in available options
  return null;
}

export function applyUrlSearchParams(
  searchParams,
  values,
  selects,
  checkBoxes,
) {
  // Handle search term
  const searchTerm = searchParams.get('search');
  if (searchTerm) {
    values.search = searchTerm;
  }

  for (const checkBox of checkBoxes) {
    if (searchParams.get(checkBox.param)) {
      values[checkBox.param] = searchParams.get(checkBox.param) === 'true';
    } else {
      // Explicitly set to false when parameter doesn't exist in URL
      values[checkBox.param] = false;
    }
  }
  const excludeSet =
    new Set([...checkBoxes.map((checkBox) => checkBox.param), 'search']) ||
    new Set();
  const filteredValues = Object.fromEntries(
    Object.entries(values).filter(([key]) => !excludeSet.has(key)),
  );
  for (const key in filteredValues) {
    if (values.hasOwnProperty(key)) {
      if (searchParams.get(key)) {
        const value_ = searchParams.get(key);
        const items = _.find(selects, {param: key}).items;
        const values_ = _.chain(items).flatMap('value').value();
        if (_.find(selects, {param: key}).multiple) {
          const valueLst = value_.split(',').map((v) => v.trim());
          const arr = [];
          for (let i = 0; i < valueLst.length; i++) {
            const generatedValue = genValue(valueLst[i], values_, items);
            if (generatedValue !== null) {
              arr.push(generatedValue);
            }
          }
          values[key] = arr.length > 0 ? arr : null;
        } else {
          const generatedValue = genValue(value_.trim(), values_, items);
          values[key] = generatedValue !== null ? generatedValue : null;
        }
      }
    }
  }

  return searchTerm || '';
}

/**
Transforms and organizes an array of data into a map of unique values using the specified parameter.
Given an array of data and a parameter, this function applies a series of operations to create a map of unique values with specific properties. 
The steps involve flattening the array, removing falsy values, eliminating duplicates, and generating objects with properties for each unique value.
@param {Array} data - The array of data to be processed.
@param {string} param - The parameter used for mapping and transformation.
@returns {Array} - The packed map of data after applying transformations.
*/
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

export function genDropdownLists(origData, selects) {
  for (let i = 0; i < selects.length; i++) {
    let lst;
    if (selects[i].param === 'language' || selects[i].param === 'langs') {
      lst = [
        {value: 'en-US', label: 'en'},
        {value: 'de-DE', label: 'de'},
      ];
    } else {
      lst = packMap(origData, selects[i].param);
      if (selects[i].param === 'correlaidx') {
        lst.push({value: 'global', label: 'Global'});
      }
    }
    selects[i].items = lst;
  }

  return selects;
}
