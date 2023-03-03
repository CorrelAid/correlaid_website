import { c as create_ssr_component, a as subscribe, v as validate_component, e as escape, h as each, d as add_attribute } from "../../../../../chunks/index3.js";
import { P as Person } from "../../../../../chunks/Person.js";
import { H as Html } from "../../../../../chunks/Html.js";
import { p as page_key } from "../../../../../chunks/page_key.js";
import { d as gen_date, g as gen_img_url } from "../../../../../chunks/helpers.js";
import { l as locale } from "../../../../../chunks/i18n.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '#header.svelte-85cxgp{max-width:800px}.offset.svelte-85cxgp::after{content:"";border-radius:4px;border:7px solid transparent;background:linear-gradient(to left, #3863a2, #96c342) border-box;-webkit-mask:linear-gradient(#fff 0 0) padding-box,\n      linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);mask-composite:exclude;top:-12px;right:12px;bottom:12px;left:-12px;position:absolute;z-index:10;opacity:0.8}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $locale, $$unsubscribe_locale;
  let $$unsubscribe_page_key;
  $$unsubscribe_locale = subscribe(locale, (value) => $locale = value);
  $$unsubscribe_page_key = subscribe(page_key, (value) => value);
  let { data } = $$props;
  let post;
  let proc_date;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  post = data.post;
  proc_date = gen_date(post.date_created, $locale, true);
  $$unsubscribe_locale();
  $$unsubscribe_page_key();
  return `<div class="${"container mx-auto pt-12 pb-10"}"><div id="${"header"}" class="${"mx-auto pb-6 svelte-85cxgp"}">${validate_component(Html, "Html").$$render(
    $$result,
    {
      source: `<h1>${post.translations[0].title}</h1>`,
      width: "text"
    },
    {},
    {}
  )}
    <p class="${"mx-4 pt-12 text-lg"}">${escape(post.translations[0].teaser)}</p>

    <p class="${"mx-4 py-4 font-light"}">${escape(proc_date)} - ${each(post.content_creators, (person, i) => {
    return `${escape(person.Content_Creators_id.person.name)}${i < post.content_creators.length - 1 ? `${escape(", ")}` : ``}`;
  })}</p>
    <div class="${"aspect-w-16 aspect-h-9 offset my-8 mx-4 svelte-85cxgp"}"><img alt="${"Office"}"${add_attribute("src", gen_img_url(post.translations[0].title_image.id, "fit=inside&width=1200&height=675&format=png"), 0)} class="${"h-full w-full rounded border-4 border-neutral "}"></div></div>
  <div class="${"pb-10"}">${validate_component(Html, "Html").$$render(
    $$result,
    {
      source: post.translations[0].text,
      options: "prose-img:",
      width: "text"
    },
    {},
    {}
  )}</div>
  <hr>
  <div class="${"pt-12 space-y-8"}">${each(post.content_creators, (person) => {
    return `${validate_component(Person, "Person").$$render(
      $$result,
      {
        name: person.Content_Creators_id.person.name,
        img: gen_img_url(person.Content_Creators_id.person.image.id, "fit=cover&width=200&height=200&quality=80"),
        position: person.Content_Creators_id.translations[0].position,
        description: person.Content_Creators_id.translations[0].description,
        website: person.Content_Creators_id.person.website ? person.Content_Creators_id.person.website : "",
        linkedin: person.Content_Creators_id.person.linkedin ? person.Content_Creators_id.person.linkedin : "",
        mastodon: person.Content_Creators_id.person.mastodon ? person.Content_Creators_id.person.mastodon : "",
        twitter: person.Content_Creators_id.person.twitter ? person.Content_Creators_id.person.twitter : "",
        github: person.Content_Creators_id.person.github ? person.Content_Creators_id.person.github : ""
      },
      {},
      {}
    )}`;
  })}</div>
</div>`;
});
export {
  Page as default
};
