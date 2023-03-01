import { getDirectusClient } from '$lib/js/directus_client';
import { error } from '@sveltejs/kit'


const directus = await getDirectusClient();

const directus_fetch = async (query) => {

    let data;

    try {
        const response = await directus.graphql.items(query);
        data = response.data


    } catch (err) {
        throw error(500, {
            message: err.message
        })
    }


    return data


}

export default directus_fetch
