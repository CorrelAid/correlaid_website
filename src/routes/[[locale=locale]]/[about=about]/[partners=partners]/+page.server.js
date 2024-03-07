import {getLang, getLocale} from '$lib/js/helpers';
import directusFetch from '$lib/js/directusFetch';
import {partnerQuery} from './queries.js';
import {parse} from '$lib/js/parseCms.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directusFetch(partnerQuery, {
    language: getLang(getLocale(params)),
  });

  const partners = data.Partners.filter(
    (partner) => partner.type === 'partner',
  );
  const financialSupporters = data.Partners.filter(
    (partner) => partner.type === 'financial_supporter',
  );

  return {
    partners: await parse(partners, 'cards', 'partners'),
    financialSupporters: await parse(financialSupporters, 'cards', 'partners'),
  };
}
