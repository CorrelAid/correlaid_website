import {getLang, getLocale} from '$lib/js/helpers';
import directusFetch from '$lib/js/directusFetch';
import {adminQuery} from './queries.js';
import {parse} from '$lib/js/parseCms.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directusFetch(adminQuery, {
    language: getLang(getLocale(params)),
  });

  const ethicsCommission = data.Global_Administrators.filter(
    (person) => person.group === 'ethics_commission',
  );

  return {
    ethicsCommission: await parse(
      ethicsCommission,
      'cards',
      'administrators',
      params,
    ),
  };
}
