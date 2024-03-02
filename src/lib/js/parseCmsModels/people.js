import {gemImgUrl} from '../helpers.js';
import {processPersonLinks} from '../parsing/processing/processingHelpers.js';

function people(person) {
  // TODO: does not quite make sense in terms of naming, because it is used to
  // parse global admins directly
  const links = processPersonLinks(person.person);
  const parsedPerson = {
    name: person.person.name,
    email: person.person.email,
    position: person.translations[0].position,
    description: person.translations[0].description,
    links: links,
  };

  if (person.person.image) {
    parsedPerson['img'] = gemImgUrl(
      person.person.image.id,
      'fit=cover&width=200&height=200&quality=80',
    );
    parsedPerson['imageDesc'] = person.person.image.description;
  }

  if (person.person.translations[0]) {
    parsedPerson['pronouns'] = person.person.translations[0].pronouns;
  }
  return parsedPerson;
}

export function experts(expert) {
  const parsedExpert = people(expert);
  // Currently a hack in the schema to model area of expertise as "position"
  parsedExpert['position'] = expert.translations[0].area_of_expertise;
  return parsedExpert;
}

export function globalAdministrators(admin) {
  return people(admin);
}

export function localAdministrators(admin) {
  return people(admin.Local_Administrators_id);
}

export function contentCreators(creator) {
  return people(creator.Content_Creators_id);
}
