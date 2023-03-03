import { c as create_ssr_component, a as subscribe } from "../../../../chunks/index3.js";
import { p as page_key } from "../../../../chunks/page_key.js";
import "../../../../chunks/i18n.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page_key;
  $$unsubscribe_page_key = subscribe(page_key, (value) => value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  data.remote_office;
  data.board;
  data.organizational_structure;
  data.ethics_commission;
  $$unsubscribe_page_key();
  return ``;
});
export {
  Page as default
};
