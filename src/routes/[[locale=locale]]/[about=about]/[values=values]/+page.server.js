import {getLang} from '$lib/js/helpers';
import directusFetch from '$lib/js/directusFetch';
import {adminQuery} from './queries.js';
import {parseEntries} from '$lib/js/parseCms.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directusFetch(adminQuery, {language: getLang(params)});

  const ethicsCommission = data.Global_Administrators.filter(
    (person) => person.group === 'ethics_commission',
  );

  return {
    ethicsCommission: parseEntries(ethicsCommission, 'globalAdministrators'),
  };
}
