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
    position: section.item.translations[0].position,
    description: section.item.translations[0].description,
    links: links,
  };

  if (section.item.person.image) {
    personParams['img'] = gen_img_url(
      section.item.person.image.id,
      'fit=cover&width=200&height=200&quality=80',
    );
    personParams['image_desc'] = section.item.person.image.description;
  }

  if (section.item.person.translations[0]) {
    personParams['pronouns'] = section.item.person.translations[0].pronouns;
  }

  if (section.item.email) {
    personParams['email'] = section.item.email;
  } else {
    personParams['email'] = section.item.person.email;
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
    position: person.person.translations[0].position,
    description: person.person.translations[0].description,
    links: links,
  };

  if (person.person.image) {
    parsedPerson['img'] = gen_img_url(
      person.person.image.id,
      'fit=cover&width=200&height=200&quality=80',
    );
    parsedPerson['image_desc'] = person.person.image.description;
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
