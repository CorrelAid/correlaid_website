import {cache} from '$lib/js/cache'
import { get_lang } from '$lib/js/helpers'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {


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


  const data = await cache("lcs", query)

    const geo_json = {
        "type": "FeatureCollection",
        "features": []
    }

    const local_chapters = data.Local_Chapters

    for (let i = 0; i < local_chapters.length; i++) {
        var obj = {
            "type": "Feature",
            "geometry": local_chapters[i].location,
            "properties": {
                "founded": local_chapters[i].founded,
                "name": `CorrelAidX ${local_chapters[i].translations[0].city}`,
                "city": local_chapters[i].translations[0].city,
            }
        }
        geo_json.features.push(obj)
    }

    return { local_chapters: geo_json }

}