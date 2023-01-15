import { page } from '$app/stores';

import strapi_fetch from '$lib/js/strapi_fetch'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const slug = params.slug;

    let data = await strapi_fetch("/events", `filters[slug][$eq]=${slug}`, params);

    data = data[0]

    return { title: data.attributes.title, description: data.attributes.description };

}