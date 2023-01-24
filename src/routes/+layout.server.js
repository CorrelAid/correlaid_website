import directus_fetch from '$lib/js/directus_fetch'
import { get_lang, get_locale } from '$lib/js/helpers'
import translations from "$lib/data/translations.js";


/** @type {import('./$types').PageServerLoad} */
export async function load({ params, url, route, }) {

    const page_keys = translations[`${get_locale(params)}`]

    const find = (v) => {
        return Object.keys(page_keys).filter((k) => page_keys[k].url == url.pathname)
    }

    const page_key = find(page_keys)

    let data = {};

    const query = `query {
        Pages(filter: { page_key: {_eq: "${page_key}"}}) {
            
          translations(filter: { languages_code: { code: {_eq : "${get_lang(params)}"}}}){
             content
          }
        }
      }`

    
    try{
        data = await directus_fetch(query)
    } catch(err){
        console.log(err.body.message)
        return {}
    }

    return { content: data.Pages[0].translations[0].content }

}