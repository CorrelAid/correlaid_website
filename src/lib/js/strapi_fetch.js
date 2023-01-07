import axios from 'axios';
import { STRAPI_ACCESS_TOKEN } from '$env/static/private';
import { STRAPI_URL } from '$env/static/private';

const contentfulFetch = async (query) => {
  const url = STRAPI_URL + "/api" + query + "?populate=deep"

  try {
    const res = await axios.get(url, {
      headers: { "Authorization": "bearer " + STRAPI_ACCESS_TOKEN },
      params: {}
    })

    let data = res.data;
    
    return { response: data, error: null}
  }
  catch (err) {
    if (err.response) {
      // The client was given an error response (5xx, 4xx)

   
      return {data: null, err: err.message}
    } else if (err.request) {
      // The client never received a response, and the request was never left
      return {data: null, err: err.request}
    } else {
      // Anything else
      return {data: null, err: err.message}
    }

  }


}
export default contentfulFetch

// https://stackabuse.com/handling-errors-with-axios/