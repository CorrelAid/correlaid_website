import { c as create_ssr_component, a as subscribe, h as each, v as validate_component } from "../../../../../chunks/index3.js";
import { p as page_key } from "../../../../../chunks/page_key.js";
import { d as getGroup, g as gen_img_url } from "../../../../../chunks/helpers.js";
import { p as page } from "../../../../../chunks/stores.js";
import { P as Person } from "../../../../../chunks/Person.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page_key, $$unsubscribe_page_key;
  let $$unsubscribe_page;
  $$unsubscribe_page_key = subscribe(page_key, (value) => $page_key = value);
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { data } = $$props;
  let group_name;
  let group;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  group_name = getGroup($page_key);
  {
    if (group_name) {
      group = data[group_name];
    }
  }
  $$unsubscribe_page_key();
  $$unsubscribe_page();
  return `${group ? `<div class="${"container mx-auto flex flex-col gap-y-3 py-8 space-y-8"}">${each(group, (person) => {
    return `${validate_component(Person, "Person").$$render(
      $$result,
      {
        name: person.person.name,
        img: gen_img_url(person.person.image.id, "fit=cover&width=200&height=200&quality=80"),
        position: person.translations[0].position,
        description: person.translations[0].description
      },
      {},
      {}
    )}`;
  })}</div>` : ``}`;
});
export {
  Page as default
};
