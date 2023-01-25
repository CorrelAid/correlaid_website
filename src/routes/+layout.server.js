import directus_fetch from '$lib/js/directus_fetch'
import { get_lang, get_locale } from '$lib/js/helpers'
import translations from "$lib/data/translations.js";
import { page } from '$app/stores';


/** @type {import('./$types').PageServerLoad} */
export async function load({ params, url, route, }) {

    const page_keys = translations[`${get_locale(params)}`]

    const find = (v) => {
        return Object.keys(page_keys).filter((k) => page_keys[k].url == url.pathname)
    }

    const page_key = find(page_keys)[0]

    let data = {};

    const query = `query {
        Pages(filter: { page_key: {_eq: "${page_key}"}}){
            builder{
                collection
                item{
                    ... on buttons{
                        translations(filter: { languages_code: { code: {_eq : "${get_lang(params)}"}}}){
                            text
                        }
                    }
                     ... on wysiwyg{
                        translations(filter: { languages_code: { code: {_eq : "${get_lang(params)}"}}}){
                            content
                        }
                    }
                    ... on heros{
                        image{
                            id
                        }
                        builder{
                            collection
                            item{
                                ... on buttons{
                                    translations(filter: { languages_code: { code: {_eq : "${get_lang(params)}"}}}){
                                        languages_code{
                                            code
                                        }
                                        text
                                    }
                                }
                            }
                        }
                        
                    }
                }
            }
        } 
        }
      
      `


    data = await directus_fetch(query)

    return { builder: data.Pages[0].builder }


}