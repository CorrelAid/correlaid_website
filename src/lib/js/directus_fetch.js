import { getDirectusClient } from '$lib/js/directus_client.js';
import { error } from '@sveltejs/kit'
import { data } from 'autoprefixer';


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

    

}

export default directus_fetch
