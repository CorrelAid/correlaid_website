import {getLang} from '$lib/js/helpers';
import directusFetch from '$lib/js/directusFetch';
import {adminsAndOpsStructQuery} from './queries.js';
import {parseEntries} from '$lib/js/parseCms.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directusFetch(adminsAndOpsStructQuery, {
    language: getLang(params),
  });

  const remoteOffice = data.Global_Administrators.filter(
    (person) => person.group === 'remote_office',
  );
  const board = data.Global_Administrators.filter(
    (person) => person.group === 'board',
  );
  const remoteOfficeDescription =
    data.Organizational_Structure.translations[0].remote_office;
  const boardDescription = data.Organizational_Structure.translations[0].board;

  return {
    remoteOffice: parseEntries(remoteOffice, 'globalAdministrators'),
    board: parseEntries(board, 'globalAdministrators'),
    remoteOfficeDescription: remoteOfficeDescription,
    boardDescription: boardDescription,
  };
}
