import directusFetch from '$lib/js/directusFetch';
import {getLang} from '$lib/js/helpers';
import {expertsQuery} from './queries.js';
import {parseEntries} from '$lib/js/parseCms';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directusFetch(expertsQuery, {language: getLang(params)});

  const experts = parseEntries(data.Experts, 'experts');

  return {experts: experts};
}
