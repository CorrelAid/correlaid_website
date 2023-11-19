// Source: https://svelte.dev/repl/de39de663ef2445b8fe17b79c500013b?version=3.55.0
import {derived, writable} from 'svelte/store';
import page_keys from '$lib/data/page_keys';
import {translate} from '$lib/js/helpers';

export const locale = writable('');
export const locales = Object.keys(page_keys);

export const t = derived(
  locale,
  ($locale) =>
    (key, vars = {}) =>
      translate($locale, key, vars),
);
