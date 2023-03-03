import { c as create_ssr_component, a as subscribe, h as each, e as escape } from "../../../../../chunks/index3.js";
import { p as page_key } from "../../../../../chunks/page_key.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page_key;
  $$unsubscribe_page_key = subscribe(page_key, (value) => value);
  let { data } = $$props;
  let workshops;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  workshops = data.workshops;
  $$unsubscribe_page_key();
  return `<div class="${"container mx-auto pb-8 pl-4 pr-6 space-y-4"}"><ul>${each(workshops, (workshop, i) => {
    return `<li>${escape(workshop.name)}
        </li>`;
  })}</ul></div>`;
});
export {
  Page as default
};
