import {getLang, getLocale} from '$lib/js/helpers';
import directusFetch from '$lib/js/directusFetch';
import {adminsAndOpsStructQuery} from './queries.js';
import {parse} from '$lib/js/parseCms.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directusFetch(adminsAndOpsStructQuery, {
    language: getLang(getLocale(params)),
  });

  const remoteOffice = data.Global_Administrators.filter(
    (person) => person.group === 'remote_office',
  );
  const board = data.Global_Administrators.filter(
    (person) => person.group === 'board',
  );

  return {
    remoteOffice: await parse(remoteOffice, 'cards', 'administrators', params),
    board: await parse(board, 'cards', 'administrators', params),
  };
}
