import { c as create_ssr_component, a as subscribe, e as escape, v as validate_component } from "../../../../../../chunks/index3.js";
import { p as page_key } from "../../../../../../chunks/page_key.js";
import "../../../../../../chunks/i18n.js";
import { H as Html } from "../../../../../../chunks/Html.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page_key;
  $$unsubscribe_page_key = subscribe(page_key, (value) => value);
  let { data } = $$props;
  let local_chapter;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  local_chapter = data.local_chapter;
  $$unsubscribe_page_key();
  return `<div class="${"container mx-auto"}"><h2>${escape(local_chapter.translations[0].city)}</h2>
    ${validate_component(Html, "Html").$$render(
    $$result,
    {
      source: local_chapter.translations[0].description,
      options: "prose-img:",
      width: "text"
    },
    {},
    {}
  )}
    
  </div>`;
});
export {
  Page as default
};
