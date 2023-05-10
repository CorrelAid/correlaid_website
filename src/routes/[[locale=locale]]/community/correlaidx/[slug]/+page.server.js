import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import {lcDetailsQuery} from './queries.js';
import {get} from 'svelte/store';
import {locale} from '$lib/stores/i18n';
import {error} from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(lcDetailsQuery, {
    slug: params.slug,
    language: get_lang(params),
  });

  if (data.Local_Chapters.length === 0) {
    let errorMsg;
    if (get(locale) === 'de') {
      errorMsg = `Local Chapter ${params.slug} nicht bekannt`;
    } else {
      errorMsg = `Local Chapter ${params.slug} not known.`;
    }
    throw error(404, errorMsg);
  }

  return {
    local_chapter: data.Local_Chapters[0],
    events: data.Events,
    projects: data.Local_Chapters[0].Projects,
  };
}
