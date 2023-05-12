import {gen_img_url} from '../helpers.js';

function parsePersonLinks(person) {
  const links = {};
  for (const link of ['website', 'twitter', 'linkedin', 'mastodon', 'github']) {
    if (link in person && person[link] !== null) {
      links[link] = person[link];
    }
  }
  return links;
}

export function contacts(section) {
  const links = parsePersonLinks(section.item.person);

  const personParams = {
    name: section.item.person.name,
    email: section.item.person.email,
    position: section.item.translations[0].position,
    description: section.item.translations[0].description,
    links: links,
  };

  if (section.item.person.image) {
    personParams['img'] = gen_img_url(
      section.item.person.image.id,
      'fit=cover&width=200&height=200&quality=80',
    );
  }

  if (section.item.person.translations[0]) {
    personParams['pronouns'] = section.item.person.translations[0].pronouns;
  }

  return personParams;
}

function persons(person) {
  // TODO: does not quite make sense in terms of naming, because it is used to
  // parse global admins directly
  const links = parsePersonLinks(person.person);

  const parsedPerson = {
    name: person.person.name,
    email: person.person.email,
    position: person.translations[0].position,
    description: person.translations[0].description,
    links: links,
  };

  if (person.person.image) {
    parsedPerson['img'] = gen_img_url(
      person.person.image.id,
      'fit=cover&width=200&height=200&quality=80',
    );
  }

  if (person.person.translations[0]) {
    parsedPerson['pronouns'] = person.person.translations[0].pronouns;
  }
  return parsedPerson;
}

export function experts(expert) {
  const parsedExpert = persons(expert);
  // Currently a hack in the schema to model area of expertise as "position"
  parsedExpert['position'] = expert.translations[0].area_of_expertise;
  return parsedExpert;
}

export function global_administrators(admin) {
  return persons(admin);
}

export function local_administrators(admin) {
  return persons(admin.Local_Administrators_id);
}

export function content_creators(creator) {
  return persons(creator.Content_Creators_id);
}
