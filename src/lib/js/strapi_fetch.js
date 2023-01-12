import axios from 'axios';
import { STRAPI_ACCESS_TOKEN } from '$env/static/private';
import { STRAPI_URL } from '$env/static/private';
import { error } from '@sveltejs/kit'

const strapi_fetch = async (query, filter, params) => {
  let locale = "de";
  if (params.locale != undefined) {
    locale = params.locale
  }


  const url = STRAPI_URL + "/api" + query + `?locale=${locale}` + "&populate=deep" + "&" + filter

  try {
    var res = await axios.get(url, {
      headers: { "Authorization": "bearer " + STRAPI_ACCESS_TOKEN },
      params: {}
    })

  }
  catch (err) {
    if (err.response) {
      // The client was given an error response (5xx, 4xx)

      throw error(err.response.status, {
        message: "Something went wrong with the request to the CMS API"
      })

    } else if (err.request) {
      throw error(500, {
        message: " The request to the CMS API was made but no response was received"
      })
    } else {
      throw error(500, {
        message: err.message
      })
    }

  }

  const data = res.data.data

  if (data.length == 0) {
    throw error(400, {
      message: "No data received by CMS API"
    })
  }

  return data


}
export default strapi_fetch

// https://stackabuse.com/handling-errors-with-axios/