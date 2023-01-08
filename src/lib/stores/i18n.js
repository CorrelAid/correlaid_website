// Source: https://svelte.dev/repl/de39de663ef2445b8fe17b79c500013b?version=3.55.0
import { derived, writable } from "svelte/store";
import translations from "$lib/data/translations.js";
import { translate } from "$lib/js/helpers.js";

export const locale = writable("de");
export const locales = Object.keys(translations);


export const t = derived(locale, ($locale) => (key, vars = {}) =>
  translate($locale, key, vars)
);
