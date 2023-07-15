import {get_lang} from '$lib/js/helpers';
import directus_fetch from '$lib/js/directus_fetch';
import {adminQuery} from './queries.js';
import {parseEntries} from '$lib/js/parse_cms.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(adminQuery, {language: get_lang(params)});

  const ethics_commission = data.Global_Administrators.filter(
    (person) => person.group === 'ethics_commission',
  );

  return {
    ethics_commission: parseEntries(ethics_commission, 'global_administrators'),
  };
}
