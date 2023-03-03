import { c as create_ssr_component, a as subscribe, o as onDestroy, d as add_attribute } from "../../../../../chunks/index3.js";
import { p as page } from "../../../../../chunks/stores.js";
import { p as page_key } from "../../../../../chunks/page_key.js";
import "maplibre-gl";
import { l as locale } from "../../../../../chunks/i18n.js";
const maplibreGl = "";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "#map.svelte-19revja{height:600px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_locale;
  let $$unsubscribe_page;
  let $$unsubscribe_page_key;
  $$unsubscribe_locale = subscribe(locale, (value) => value);
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_page_key = subscribe(page_key, (value) => value);
  let mapContainer;
  let { data } = $$props;
  onDestroy(() => {
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  data.community_manager;
  data.local_chapters;
  $$unsubscribe_locale();
  $$unsubscribe_page();
  $$unsubscribe_page_key();
  return `<div class="${"container mx-auto py-6"}"><div class="${"relative px-2"}"><a href="${"https://www.maptiler.com"}" class="${"absolute left-4 bottom-4 z-10 "}"><img src="${"https://api.maptiler.com/resources/logo.svg"}" alt="${"MapTiler logo"}"></a>
        <div class="${"w-full border border-neutral-25 rounded  svelte-19revja"}" id="${"map"}"${add_attribute("this", mapContainer, 0)}></div></div>
</div>`;
});
export {
  Page as default
};
