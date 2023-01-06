import { STRAPI_ACCESS_TOKEN } from '$env/static/private';
import { STRAPI_URL } from '$env/static/private';

const contentfulFetch = async (query) => {
  const url = STRAPI_URL + "/api" + query

  const response = await fetch(url, {
    headers: new Headers({
      "Authorization": "bearer " + STRAPI_ACCESS_TOKEN
    })})

  return response
}

export default contentfulFetch