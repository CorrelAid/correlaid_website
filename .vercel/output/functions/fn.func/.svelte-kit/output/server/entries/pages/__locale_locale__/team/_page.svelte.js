import { c as create_ssr_component, a as subscribe, v as validate_component, h as each } from "../../../../chunks/index3.js";
import { p as page_key } from "../../../../chunks/page_key.js";
import { g as gen_img_url } from "../../../../chunks/helpers.js";
import { H as Html } from "../../../../chunks/Html.js";
import { P as Person } from "../../../../chunks/Person.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page_key;
  $$unsubscribe_page_key = subscribe(page_key, (value) => value);
  let { data } = $$props;
  let remote_office;
  let board;
  let ethics_commission;
  let organizational_structure;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  remote_office = data.remote_office;
  board = data.board;
  ethics_commission = data.ethics_commission;
  organizational_structure = data.organizational_structure;
  {
    console.log(organizational_structure);
  }
  $$unsubscribe_page_key();
  return `${validate_component(Html, "Html").$$render(
    $$result,
    {
      source: organizational_structure.translations[0].remote_office,
      options: "",
      width: "text"
    },
    {},
    {}
  )}

<div class="${"container mx-auto flex flex-col gap-y-3 py-8 space-y-8"}">${each(remote_office, (person) => {
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
  })}</div>

${validate_component(Html, "Html").$$render(
    $$result,
    {
      source: organizational_structure.translations[0].board,
      options: "",
      width: "text"
    },
    {},
    {}
  )}

<div class="${"container mx-auto flex flex-col gap-y-3 py-8 space-y-8"}">${each(board, (person) => {
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
  })}</div>

${validate_component(Html, "Html").$$render(
    $$result,
    {
      source: organizational_structure.translations[0].ethics_commission,
      options: "",
      width: "text"
    },
    {},
    {}
  )}

<div class="${"container mx-auto flex flex-col gap-y-3 py-8 space-y-8"}">${each(ethics_commission, (person) => {
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
  })}</div>`;
});
export {
  Page as default
};
