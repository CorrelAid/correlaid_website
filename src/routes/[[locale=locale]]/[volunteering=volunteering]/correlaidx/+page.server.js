import {directusFetch, getAllowedStatus} from '$lib/js/directusFetch';
import {getLang} from '$lib/js/helpers';
import {localChapterQuery} from './queries.js';

/** @type {import('./$types.js').PageServerLoad} */
export async function load({params}) {
  const data = await directusFetch(localChapterQuery, {
    language: getLang(params),
    status: getAllowedStatus(),
  });

  const geoJson = {
    type: 'FeatureCollection',
    features: [],
  };

  const localChapters = data.Local_Chapters;

  for (let i = 0; i < localChapters.length; i++) {
    const obj = {
      type: 'Feature',
      geometry: localChapters[i].location,
      properties: {
        founded: localChapters[i].founded,
        name: `CorrelAidX ${localChapters[i].translations[0].city}`,
        short_id: localChapters[i].short_id,
      },
    };
    geoJson.features.push(obj);
  }

  return {geoJson: geoJson, localChapters: data.Local_Chapters};
}
