import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import _ from 'lodash';
import {blogPostQuery} from './queries.js';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(blogPostQuery, {
    slug: params.slug,
    language: get_lang(params),
  });
  // checking if post exists in current locale, if not using other language
  let lang_content = _.find(
    data.Posts[0].translations,
    (el) => el.languages_code.code === get_lang(params),
  );

  if (lang_content === undefined) {
    lang_content = data.Posts[0].translations[0];
  }

  return {
    pubdate: data.Posts[0].pubdate,
    lang_content: lang_content,
    content_creators: data.Posts[0].content_creators,
    post: data.Posts[0],
  };
}
