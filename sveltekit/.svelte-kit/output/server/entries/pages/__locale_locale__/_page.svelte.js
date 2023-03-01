import { c as create_ssr_component, a as subscribe } from "../../../chunks/index3.js";
import { p as page_key } from "../../../chunks/page_key.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page_key;
  $$unsubscribe_page_key = subscribe(page_key, (value) => value);
  $$unsubscribe_page_key();
  return ``;
});
export {
  Page as default
};
