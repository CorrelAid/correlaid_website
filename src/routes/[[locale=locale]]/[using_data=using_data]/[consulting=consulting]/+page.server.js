import directusFetch from '$lib/js/directusFetch';
import {getLang, getLocale} from '$lib/js/helpers';
import {expertsQuery} from './queries.js';
import {parse} from '$lib/js/parseCms';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directusFetch(expertsQuery, {
    language: getLang(getLocale(params)),
  });

  return {experts: await parse(data.Experts, 'cards', 'experts')};
}
