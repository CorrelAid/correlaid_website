import {directus_fetch, getAllowedStatus} from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import {localChapterQuery} from './queries.js';

/** @type {import('./$types.js').PageServerLoad} */
export async function load({params}) {
  const data = await directus_fetch(localChapterQuery, {
    language: get_lang(params),
    status: getAllowedStatus(),
  });

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
        short_id: local_chapters[i].short_id,
      },
    };
    geo_json.features.push(obj);
  }

  return {geo_json: geo_json, local_chapters: data.Local_Chapters};
}
