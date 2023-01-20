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

    if(data[Object.keys(data)[0]].length == 0){
        throw error(500, {
            message: "No data returned"
        })
    }else{
        return data
    }

   

    // try {
    //   var res = await axios.get(url, {
    //     headers: { "Authorization": "bearer " + STRAPI_ACCESS_TOKEN },
    //     params: {}
    //   })

    // }
    // catch (err) {
    //   if (err.response) {
    //     // The client was given an error response (5xx, 4xx)

    //     throw error(err.response.status, {
    //       message: "Something went wrong with the request to the CMS API"
    //     })

    //   } else if (err.request) {
    //     throw error(500, {
    //       message: " The request to the CMS API was made but no response was received"
    //     })
    //   } else {
    //     throw error(500, {
    //       message: err.message
    //     })
    //   }

    // }

    // const data = res.data.data

    // if (data.length == 0) {
    //   throw error(400, {
    //     message: "No data received by CMS API"
    //   })
    // }

    // return data

}

export default directus_fetch
