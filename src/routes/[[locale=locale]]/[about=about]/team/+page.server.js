import {get_lang} from '$lib/js/helpers';
import directus_fetch from '$lib/js/directus_fetch';
import {adminsAndOpsStructQuery} from './queries.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(adminsAndOpsStructQuery, {
    lanugage: get_lang(params),
  });

  const remote_office = data.Global_Administrators.filter(
    (person) => person.group === 'remote_office',
  );
  const board = data.Global_Administrators.filter(
    (person) => person.group === 'board',
  );
  const organizational_structure = data.Organizational_Structure;

  return {
    remote_office: remote_office,
    board: board,
    organizational_structure: organizational_structure,
  };
}
