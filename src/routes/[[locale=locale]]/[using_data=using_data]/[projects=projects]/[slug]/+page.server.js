import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import _ from 'lodash';
import {projectDetailsQuery} from './queries.js';
import {handle_lang} from '$lib/js/helpers';
import {get} from 'svelte/store';
import {locale} from '$lib/stores/i18n';
import {error} from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(projectDetailsQuery, {
    slug: params.slug,
    language: get_lang(params),
  });

  if (data.Projects.length === 0) {
    let errorMsg;
    if (get(locale) === 'de') {
      errorMsg = `Projekt ${params.slug} nicht bekannt`;
    } else {
      errorMsg = `Project ${params.slug} not known.`;
    }
    throw error(404, errorMsg);
  }

  const posts = handle_lang(
    _.flatMap(data.Projects[0].Posts, (data) => [data.Posts_id]),
    params,
  );

  data.Projects[0].Posts = posts;

  return {project: data.Projects[0]};
}
