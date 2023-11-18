import {get_lang} from '$lib/js/helpers';
import directus_fetch from '$lib/js/directus_fetch';
import {partnerQuery} from './queries.js';
import {parseEntries} from '$lib/js/parse_cms.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(partnerQuery, {language: get_lang(params)});

  const partners = data.Partners.filter(
    (partner) => partner.type === 'partner',
  );
  const financial_supporters = data.Partners.filter(
    (partner) => partner.type === 'financial_supporter',
  );

  return {
    partners: parseEntries(partners, 'partners'),
    financial_supporters: parseEntries(financial_supporters, 'partners'),
  };
}
