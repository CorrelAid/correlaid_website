import directus_fetch from '$lib/js/directus_fetch';
import {get_lang} from '$lib/js/helpers';
import {lcDetailsQuery} from './queries.js';
import {error} from '@sveltejs/kit';
import {parseLocalChapterPage} from '$lib/js/parse_cms';

function capitalize(string) {
  if (string.length === 0) {
    return '';
  } else {
    return string[0].toUpperCase() + capitalizeInternal(string.substr(1));
  }
}

/*
 * Handles capitalization of hyphenated and similar expressions.
 * For example for the local chapter rhein-main
 */
function capitalizeInternal(string) {
  // Find word boundaries for german words as well
  // \W in js regex matches umlaute etc. and therefore the more complex
  // expression is used.
  const splitPoint = string.search(/[^\wöüäÖÜÄß]\w/);
  if (splitPoint === -1) {
    return string;
  } else {
    return (
      string.substr(0, splitPoint + 1) +
      string[splitPoint + 1].toUpperCase() +
      capitalizeInternal(string.substr(splitPoint + 2))
    );
  }
}

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  const data = await directus_fetch(lcDetailsQuery, {
    slug: capitalize(params.slug),
    language: get_lang(params),
  });

  if (data.Local_Chapters.length === 0) {
    throw error(404);
  }

  return parseLocalChapterPage(data);
}
