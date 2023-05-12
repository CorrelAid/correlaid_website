import * as parseModel from './parse_cms_models';

function reportParseError(err, description, rawInput) {
  console.group('CMS PARSE ERROR: ' + description);
  console.log(err.message);
  console.log(err.stack);
  console.log(rawInput);
  console.groupEnd();
}

export function parseEntries(rawEntries, type) {
  const parsedEntries = [];
  for (const rawEntry of rawEntries) {
    try {
      const entry = parseModel[type](rawEntry);
      parsedEntries.push(entry);
    } catch (err) {
      reportParseError(err, `For type ${type}`, rawEntry);
    }
  }
  return parsedEntries;
}

export function parseProject(project) {
  let parsedProject;
  try {
    const projectLinks = {};

    if (project.Projects_Outputs.length !== 0) {
      projectLinks['repo'] = project.Projects_Outputs[0].url;
    }

    if (project.Podcast) {
      projectLinks['podcast_href'] = project.Podcast.soundcloud_link;
    }
    if (project.Posts.length !== 0) {
      projectLinks['post_slug'] = project.Posts[0].translations.slug;
    }

    const projectContacts = [];
    for (const person of project.People) {
      const parsedPerson = {
        name: person.People_id.name,
      };
      if (
        person.People_id.translations[0] &&
        person.People_id.translations[0].pronouns
      ) {
        parsedPerson[
          'pronouns'
        ] = `(${person.People_id.translations[0].pronouns})`;
      }
      const parsedLinks = {name: person.People_id.name};

      for (const link of [
        'website',
        'linkedin',
        'mastodon',
        'twitter',
        'github',
      ]) {
        if (person.People_id[link]) {
          parsedLinks[link] = person.People_id[link];
        }
      }

      parsedPerson['links'] = parsedLinks;
      projectContacts.push(parsedPerson);
    }

    parsedProject = {
      title: project.translations[0].title,
      teaser: project.translations[0].summary,
      description: project.translations[0].description,
      organization_name:
        project.Organizations[0].Organizations_id.translations[0].name,
      organization_description:
        project.Organizations[0].Organizations_id.translations[0].description,
      projectLinks: projectLinks,
      projectContacts: projectContacts,
    };
  } catch (err) {
    reportParseError(err, 'For Project page', project);
  }
  return parsedProject;
}
