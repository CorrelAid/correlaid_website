import * as parseModel from './parse_cms_models';

export function parseEntries(rawEntries, type) {
  const parsedEntries = [];
  for (const rawEntry of rawEntries) {
    try {
      const entry = parseModel[type](rawEntry);
      parsedEntries.push(entry);
    } catch (err) {
      console.group(`Error parsing ${type}`);
      console.log(err.message);
      console.log(rawEntry);
      console.groupEnd();
    }
  }
  return parsedEntries;
}
