import {getLang, getLocale} from '$lib/js/helpers';
import directusFetch from '$lib/js/directusFetch';
import {partnerQuery} from './queries.js';
import {parse} from '$lib/js/parseCms.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directusFetch(partnerQuery, {
    language: getLang(getLocale(params)),
  });

  const currentPartners = data.Partners.filter(
    (partner) => partner.former_partner === false,
  );
  const formerPartners = data.Partners.filter(
    (partner) => partner.former_partner === true,
  );

  return {
    currentPartners: await parse(currentPartners, 'cards', 'partners'),
    formerPartners: await parse(formerPartners, 'cards', 'partners'),
  };
}
