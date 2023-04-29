import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
  // prettier-ignore
  const query = `
  query {
    Local_Chapters{
        location
        founded
        translations(filter: { languages_code: { code: {_eq : "${get_lang(params)}"}}}){
            city
            description
        }
    }
  }`

  const data = await directus_fetch(query);

  const geo_json = {
    type: 'FeatureCollection',
    features: [],
  };

  const local_chapters = data.Local_Chapters;

  for (let i = 0; i < local_chapters.length; i++) {
    const obj = {
      type: 'Feature',
      geometry: local_chapters[i].location,
      properties: {
        founded: local_chapters[i].founded,
        name: `CorrelAidX ${local_chapters[i].translations[0].city}`,
        city: local_chapters[i].translations[0].city,
      },
    };
    geo_json.features.push(obj);
  }

  return {geo_json: geo_json, local_chapters: data.Local_Chapters};
}
