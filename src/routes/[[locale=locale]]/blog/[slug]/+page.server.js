import { page } from '$app/stores';

import strapi_fetch from '$lib/js/strapi_fetch'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const slug = params.slug;
    let locale="de";
    if(params.locale != undefined){
        locale = params.locale
    }

    let data = await strapi_fetch("/posts", locale, `filters[slug][$eq]=${slug}`);

    data = data[0]

    return { title: data.attributes.title, text: data.attributes.text };

}