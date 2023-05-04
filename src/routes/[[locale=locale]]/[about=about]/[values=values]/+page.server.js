import {get_lang} from '$lib/js/helpers';
import directus_fetch from '$lib/js/directus_fetch';
import {adminQuery} from './queries.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(adminQuery, {language: get_lang(params)});

  const ethics_commission = data.Global_Administrators.filter(
    (person) => person.group === 'ethics_commission',
  );

  return {
    ethics_commission: ethics_commission,
  };
}
