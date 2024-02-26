import {getLang} from '$lib/js/helpers';
import directusFetch from '$lib/js/directusFetch';
import {partnerQuery} from './queries.js';
import {parseEntries} from '$lib/js/parseCms.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directusFetch(partnerQuery, {language: getLang(params)});

  const partners = data.Partners.filter(
    (partner) => partner.type === 'partner',
  );
  const financialSupporters = data.Partners.filter(
    (partner) => partner.type === 'financial_supporter',
  );

  return {
    partners: parseEntries(partners, 'partners'),
    financialSupporters: parseEntries(financialSupporters, 'partners'),
  };
}
