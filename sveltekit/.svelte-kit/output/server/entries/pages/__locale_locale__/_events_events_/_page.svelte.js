import { c as create_ssr_component, a as subscribe, e as escape, d as add_attribute, h as each, v as validate_component } from "../../../../chunks/index3.js";
import { p as page_key } from "../../../../chunks/page_key.js";
import { l as locale, t } from "../../../../chunks/i18n.js";
import { e as gen_date, g as gen_img_url } from "../../../../chunks/helpers.js";
const Calendar_Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $locale, $$unsubscribe_locale;
  $$unsubscribe_locale = subscribe(locale, (value) => $locale = value);
  let { image_url } = $$props;
  let { href } = $$props;
  let { title } = $$props;
  let { teaser } = $$props;
  let { date } = $$props;
  let { tags } = $$props;
  let proc_date;
  if ($$props.image_url === void 0 && $$bindings.image_url && image_url !== void 0)
    $$bindings.image_url(image_url);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.teaser === void 0 && $$bindings.teaser && teaser !== void 0)
    $$bindings.teaser(teaser);
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  if ($$props.tags === void 0 && $$bindings.tags && tags !== void 0)
    $$bindings.tags(tags);
  proc_date = gen_date(date, $locale);
  $$unsubscribe_locale();
  return `<div class="${"w-full relative offset-right"}" style="${""}"><div class="${"w-full border border-neutral-25 rounded h-full p-4 bg-white relative top-0 z-1 grid grid-cols-4"}"><div class="${"col-span-full xl:col-span-3 "}"><div class="${"flex space-x-2 align-center w-40 pb-2"}"><span class="${"text-xl font-light"}">${escape(proc_date)}</span></div>

            <div class="${"pb-4"}"><a${add_attribute("href", href, 0)} class="${"text-xl font-bold text-base-content hover:text-primary transition"}">${escape(title)}</a></div>

            <div class="${"flex gap-x-2 w-full pb-4"}">${each(tags, (tag) => {
    return `<span class="${"text-xs inline-flex items-center font-bold px-3 py-1 bg-secondary text-white rounded"}">${escape(tag)}</span>`;
  })}</div>

            <p class="${"text-base-content line-clamp-3 xl:pr-4 mb-4 xl:pb-0"}">${escape(teaser)}</p></div>
        <a${add_attribute("href", href, 0)} class="${"aspect-w-16 aspect-h-9 xl:col-span-1 col-span-full"}"><img alt="${"Office"}"${add_attribute("src", image_url, 0)} class="${"h-full rounded"}"></a></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page_key;
  let $t, $$unsubscribe_t;
  $$unsubscribe_page_key = subscribe(page_key, (value) => value);
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  let { data } = $$props;
  let events;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  events = data.events;
  $$unsubscribe_page_key();
  $$unsubscribe_t();
  return `<div class="${"container mx-auto pb-8 pl-4 pr-6 space-y-4"}">${each(events, (event, i) => {
    return `${validate_component(Calendar_Card, "CalendarCard").$$render(
      $$result,
      {
        href: $t("navbar.events").url + "/" + event.id,
        title: event.translations[0].title,
        teaser: event.translations[0].teaser,
        image_url: gen_img_url(event.translations[0].title_image.id, "fit=inside&width=1200&height=675&format=png"),
        date: event.date,
        tags: event.translations[0].tags
      },
      {},
      {}
    )}`;
  })}</div>`;
});
export {
  Page as default
};
