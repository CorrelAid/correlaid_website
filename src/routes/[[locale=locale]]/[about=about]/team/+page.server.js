import {get_lang} from '$lib/js/helpers';
import directus_fetch from '$lib/js/directus_fetch';
import {adminsAndOpsStructQuery} from './queries.js';
import {parseEntries} from '$lib/js/parse_cms.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(adminsAndOpsStructQuery, {
    language: get_lang(params),
  });

  const remote_office = data.Global_Administrators.filter(
    (person) => person.group === 'remote_office',
  );
  const board = data.Global_Administrators.filter(
    (person) => person.group === 'board',
  );
  const remote_office_description =
    data.Organizational_Structure.translations[0].remote_office;
  const board_description = data.Organizational_Structure.translations[0].board;

  return {
    remote_office: parseEntries(remote_office, 'global_administrators'),
    board: parseEntries(board, 'global_administrators'),
    remote_office_description: remote_office_description,
    board_description: board_description,
  };
}
