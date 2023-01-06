// Source: https://svelte.dev/repl/de39de663ef2445b8fe17b79c500013b?version=3.55.0
import { derived, writable } from "svelte/store";
import translations from "$lib/data/translations.js";

export const locale = writable("en");
export const locales = Object.keys(translations);

function translate(locale, key, vars) {
  // Let's throw some errors if we're trying to use keys/locales that don't exist.
  // We could improve this by using Typescript and/or fallback values.
  if (!key) throw new Error("no key provided to $t()");
  if (!locale) throw new Error(`no translation for key "${key}"`);

  // Grab the translation from the translations object.
  let translation = translations[locale][key];
  

  if (!translation) throw new Error(`no translation found for ${locale}.${key}`);


  let text = translation.text
  let url = translation.url

  
  // Replace any passed in variables in the translation string.
  Object.keys(vars).map((k) => {
    const regex = new RegExp(`{{${k}}}`, "g");
    text = text.replace(regex, vars[k]);
  });

  return {text, url};
}

export const t = derived(locale, ($locale) => (key, vars = {}) =>
  translate($locale, key, vars)
);
