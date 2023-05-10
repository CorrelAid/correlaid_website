import directus_fetch from '$lib/js/directus_fetch';
import {locale} from '$lib/stores/i18n';
import {get} from 'svelte/store';
import {get_lang} from '$lib/js/helpers';
import _ from 'lodash';
import {blogPostQuery} from './queries.js';
import {error} from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const vars = {
    slug: params.slug,
    language: get_lang(params),
  };
  const data = await directus_fetch(blogPostQuery, vars);

  if (data.Posts.length === 0) {
    let errorMsg;
    if (get(locale) === 'de') {
      errorMsg = `Blogpost ${params.slug} nicht bekannt`;
    } else {
      errorMsg = `Blog post ${params.slug} not known.`;
    }
    throw error(404, errorMsg);
  }

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
