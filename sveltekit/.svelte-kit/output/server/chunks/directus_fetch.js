import { P as PUBLIC_API_URL } from "./helpers.js";
import { e as error } from "./index.js";
import { Directus } from "@directus/sdk";
const directus$1 = new Directus(PUBLIC_API_URL);
async function getDirectusClient() {
  if (directus$1.auth.token)
    return directus$1;
}
const directus = await getDirectusClient();
const directus_fetch = async (query) => {
  let data;
  try {
    const response = await directus.graphql.items(query);
    data = response.data;
  } catch (err) {
    throw error(500, {
      message: err.message
    });
  }
  if (data[Object.keys(data)[0]].length == 0) {
    throw error(404, {
      message: "No CorrelContent"
    });
  } else {
    return data;
  }
};
export {
  directus_fetch as d
};