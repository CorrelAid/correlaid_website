import { c as create_ssr_component, d as add_attribute, v as validate_component, e as escape, h as each, a as subscribe } from "../../../../chunks/index3.js";
import { p as page_key } from "../../../../chunks/page_key.js";
import { t } from "../../../../chunks/i18n.js";
import { g as gen_img_url } from "../../../../chunks/helpers.js";
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { image_url } = $$props;
  let { i } = $$props;
  let { href } = $$props;
  if ($$props.image_url === void 0 && $$bindings.image_url && image_url !== void 0)
    $$bindings.image_url(image_url);
  if ($$props.i === void 0 && $$bindings.i && i !== void 0)
    $$bindings.i(i);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  return `<article class="${"overflow-hidden rounded-lg border border-neutral-25 shadow-sm relative"}"${add_attribute("style", i == 0 ? "" : "min-height:450px", 0)}><span class="${"absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-primary to-secondary opacity-75"}"></span>
    <div class="${"aspect-w-16 aspect-h-9"}"><a${add_attribute("href", href, 0)} class="${""}"><img alt="${"Office"}"${add_attribute("src", image_url, 0)} class="${"h-full w-full"}"></a></div>
    <div class="${"p-4 sm:p-6 "}">${slots.default ? slots.default({}) : ``}</div></article>`;
});
const Blog_Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { i } = $$props;
  let { image_url } = $$props;
  let { href } = $$props;
  let { title } = $$props;
  let { teaser } = $$props;
  let { tags } = $$props;
  let { content_creators } = $$props;
  if ($$props.i === void 0 && $$bindings.i && i !== void 0)
    $$bindings.i(i);
  if ($$props.image_url === void 0 && $$bindings.image_url && image_url !== void 0)
    $$bindings.image_url(image_url);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.teaser === void 0 && $$bindings.teaser && teaser !== void 0)
    $$bindings.teaser(teaser);
  if ($$props.tags === void 0 && $$bindings.tags && tags !== void 0)
    $$bindings.tags(tags);
  if ($$props.content_creators === void 0 && $$bindings.content_creators && content_creators !== void 0)
    $$bindings.content_creators(content_creators);
  return `${validate_component(Card, "Card").$$render($$result, { image_url, i, href }, {}, {
    default: () => {
      return `<a${add_attribute("href", href, 0)}><h3 class="${"text-lg font-bold text-base-content"}">${escape(title)}</h3></a>

    <p class="${"pt-2 pb-4"}">${each(content_creators, (person, i2) => {
        return `${escape(person.Content_Creators_id.person.name)}${i2 < content_creators.length - 1 ? `${escape(", ")}` : ``}`;
      })}</p>

    <div class="${"flex gap-x-2 w-full"}">${each(tags, (tag) => {
        return `<span class="${"text-xs inline-flex items-center font-bold px-3 py-1 bg-secondary text-white rounded"}">${escape(tag)}</span>`;
      })}</div>
    <div class="${"py-4"}"><p class="${"leading-relaxed text-base-content line-clamp-3 overflow-hidden"}">${escape(teaser)}</p></div>`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page_key;
  let $t, $$unsubscribe_t;
  $$unsubscribe_page_key = subscribe(page_key, (value) => value);
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  let { data } = $$props;
  let posts;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  posts = data.posts;
  $$unsubscribe_page_key();
  $$unsubscribe_t();
  return `<div class="${"container mx-auto px-4 pb-8"}"><div class="${"gap-6 grid xl:grid-cols-3"}">${each(posts, (post, i) => {
    return `<div${add_attribute("class", i == 0 ? "col-span-full" : "col-span-1", 0)}>${validate_component(Blog_Card, "BlogCard").$$render(
      $$result,
      {
        i,
        href: $t("navbar.blog").url + "/" + post.translations[0].slug,
        title: post.translations[0].title,
        teaser: post.translations[0].teaser,
        tags: post.translations[0].tags,
        image_url: gen_img_url(post.translations[0].title_image.id, "fit=inside&width=1200&height=675&format=png"),
        content_creators: post.content_creators
      },
      {},
      {}
    )}
            </div>`;
  })}</div></div>`;
});
export {
  Page as default
};
