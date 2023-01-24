import translations from "$lib/data/translations.js";

const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)

export function translate(locale, key, vars) {
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

export function constructRe(key) {
    const en = getLastItem(translate("en", key, {}).url);
    const de = getLastItem(translate("de",  key, {}).url);

    const re = new RegExp(`^${de}|${en}`);

    return re
  }

  export function get_lang(params){
    let lang;
    if (params.locale) {
      lang = "en-US"
    }
    else {
      lang = "de-DE"
    }
    return lang
  }

  export function get_locale(params){
    let lang;
    if (params.locale) {
      return params.locale
    }
    else {
      lang = "de-DE"
    }
    return "de"
  }