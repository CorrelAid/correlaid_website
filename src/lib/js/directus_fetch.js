import { getDirectusClient } from '$lib/js/directus_client.js';
import { error } from '@sveltejs/kit'


const directus = await getDirectusClient();

const directus_fetch = async (item) => {
    // let lc = "de";

    // if (params.locale) {
    //   lc = params.locale
    // }

    // const url = STRAPI_URL + "/api" + query + `?locale=${lc}` + "&populate=deep" + "&" + filter
    try {
        const response = await directus.items(item).readByQuery({ limit: -1 });
        const data = response.data
        return data
    } catch (err) {
        throw error(500, {
                  message: err.message
                })
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
