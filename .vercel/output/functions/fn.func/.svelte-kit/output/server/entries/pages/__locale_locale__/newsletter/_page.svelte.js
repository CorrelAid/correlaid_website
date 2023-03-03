import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../../chunks/index3.js";
import { p as page_key } from "../../../../chunks/page_key.js";
import { L as Link_Button } from "../../../../chunks/Link_Button.js";
import { H as Html } from "../../../../chunks/Html.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page_key;
  $$unsubscribe_page_key = subscribe(page_key, (value) => value);
  let { data } = $$props;
  let newsletter_overview;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  newsletter_overview = data.newsletter_overview;
  $$unsubscribe_page_key();
  return `<div class="${"grid grid-cols-2 gap-8 px-4 container mx-auto pb-10"}"><div class="${"lg:col-span-1 col-span-full border border-neutral-25 rounded p-4 z-1 relative offset-right bg-white top-0 z-1"}"><div class="${"mb-8 line-clamp-5"}">${validate_component(Html, "Html").$$render(
    $$result,
    {
      source: newsletter_overview.translations[0].nonprofits_text
    },
    {},
    {}
  )}</div>
        <div class="${"flex pb-10"}"><span class="${"mx-auto"}">${validate_component(Link_Button, "LinkButton").$$render(
    $$result,
    {
      href: newsletter_overview.translations[0].nonprofits_link,
      text: newsletter_overview.translations[0].nonprofits_button,
      type: "external",
      color: "bg-primary"
    },
    {},
    {}
  )}</span></div></div>
    <div class="${"lg:col-span-1 col-span-full border border-neutral-25 rounded p-4 z-1 relative offset-right bg-white top-0 z-1"}"><div class="${"mb-8 line-clamp-5"}">${validate_component(Html, "Html").$$render(
    $$result,
    {
      source: newsletter_overview.translations[0].volunteers_text
    },
    {},
    {}
  )}</div>
        <div class="${"flex pb-10"}"><span class="${"mx-auto"}">${validate_component(Link_Button, "LinkButton").$$render(
    $$result,
    {
      href: newsletter_overview.translations[0].volunteers_link,
      text: newsletter_overview.translations[0].volunteers_button,
      type: "external",
      color: "bg-secondary"
    },
    {},
    {}
  )}</span></div></div>
</div>`;
});
export {
  Page as default
};
