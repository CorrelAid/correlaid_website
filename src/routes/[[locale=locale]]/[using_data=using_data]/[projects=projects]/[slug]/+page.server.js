import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import _ from 'lodash';
import {projectDetailsQuery} from './queries.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(projectDetailsQuery, {
    slug: params.slug,
    language: get_lang(params),
  });
  const Posts = data.Projects[0].Posts;

  // checking if post exists in current locale, if not using other language. Getting languages the posts exists in.
  if (Posts.length != 0) {
    const translations = _.find(
      Posts[0].Posts_id.translations,
      (el) => el.languages_code.code === get_lang(params),
    );
    if (translations === undefined) {
      Posts[0].Posts_id.translations = Posts[0].Posts_id.translations[0];
    } else {
      Posts[0].Posts_id.translations = translations;
    }
  }

  return {project: data.Projects[0]};
}
