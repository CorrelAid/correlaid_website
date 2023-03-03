import { c as create_ssr_component, d as add_attribute, a as subscribe, v as validate_component, h as each, e as escape } from "../../../../../chunks/index3.js";
import { p as page_key } from "../../../../../chunks/page_key.js";
import { d as gen_date, e as gen_time } from "../../../../../chunks/helpers.js";
import { l as locale } from "../../../../../chunks/i18n.js";
import { H as Html } from "../../../../../chunks/Html.js";
const Time = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width } = $$props;
  let { height } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  return `<svg${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} version="${"1.1"}" viewBox="${"0 0 1200 1200"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m600 1114.5c106.43 0.097656 210.49-31.371 299.03-90.426 88.543-59.055 157.57-143.05 198.37-241.34s51.523-206.49 30.82-310.88c-20.703-104.39-71.902-200.3-147.12-275.59-75.223-75.289-171.08-126.58-275.46-147.38-104.38-20.801-212.58-10.176-310.91 30.531-98.336 40.703-182.39 109.66-241.53 198.14-59.137 88.484-90.703 192.52-90.703 298.95 0.13281 142.56 56.789 279.25 157.55 380.1 100.76 100.85 237.39 157.63 379.95 157.9zm-50-864.5c0-17.863 9.5312-34.371 25-43.301 15.469-8.9336 34.531-8.9336 50 0 15.469 8.9297 25 25.438 25 43.301v329.5l135.5 135c9.4648 9.3867 14.789 22.168 14.789 35.5s-5.3242 26.113-14.789 35.5c-9.3867 9.4648-22.168 14.789-35.5 14.789s-26.113-5.3242-35.5-14.789l-150-150c-9.3594-9.4375-14.578-22.211-14.5-35.5z"}"></path></svg>`;
});
const Calendar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width } = $$props;
  let { height } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  return `<svg${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} version="${"1.1"}" viewBox="${"0 0 1200 1200"}" xmlns="${"http://www.w3.org/2000/svg"}"><g><path d="${"m302.06 72.188v55.688c0 31.688-25.688 57.188-57.188 57.188s-57.188-25.688-57.188-57.188v-55.688c0-31.688 25.688-57.188 57.188-57.188s57.188 25.688 57.188 57.188z"}"></path><path d="${"m1012.5 72.188v55.688c0 31.688-25.688 57.188-57.188 57.188s-57.188-25.688-57.188-57.188v-55.688c0-31.688 25.688-57.188 57.188-57.188s57.188 25.688 57.188 57.188z"}"></path><path d="${"m1163.8 214.69v107.25h-1127.6v-107.25c0-58.5 47.438-105.94 105.94-105.94v14.438c0 53.625 39.375 101.44 92.812 106.5 61.312 5.625 112.5-42.375 112.5-102.19v-18.562h505.12v18.562c0 59.812 51.188 107.81 112.5 102.19 53.438-4.875 92.812-52.688 92.812-106.5v-14.438c58.5 0 105.94 47.438 105.94 105.94z"}"></path><path d="${"m36.188 392.25v686.81c0 58.5 47.438 105.94 105.94 105.94h915.75c58.5 0 105.94-47.438 105.94-105.94v-686.81z"}"></path></g></svg>`;
});
const Location = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width } = $$props;
  let { height } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  return `<svg${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} version="${"1.1"}" viewBox="${"0 0 1200 1200"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m600 0c-113.2 1.4961-221.34 47.133-301.39 127.18-80.051 80.051-125.68 188.19-127.18 301.39 0 335.79 381.43 741 397.5 758.1 8.0898 8.5156 19.324 13.34 31.07 13.34s22.98-4.8242 31.07-13.34c16.074-17.102 397.5-422.32 397.5-758.1-1.4961-113.2-47.129-221.34-127.18-301.39-80.051-80.051-188.19-125.69-301.39-127.18zm0 600c-45.465 0-89.07-18.062-121.22-50.211-32.148-32.148-50.211-75.75-50.211-121.22 0-45.465 18.062-89.066 50.211-121.22 32.148-32.148 75.754-50.207 121.22-50.207s89.07 18.059 121.22 50.207c32.148 32.152 50.211 75.754 50.211 121.22 0 30.094-7.9219 59.656-22.969 85.715-15.047 26.062-36.688 47.703-62.746 62.746-26.062 15.047-55.621 22.969-85.715 22.969z"}"></path></svg>`;
});
const Headset = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width } = $$props;
  let { height } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  return `<svg${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} version="${"1.1"}" viewBox="${"0 0 1200 1200"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"m1200 570.56v142.25c0 83.305-67.691 151.3-151.59 153.06-70.871 178.85-242.54 315.8-469.7 297.25-14.605 22.68-40.043 38.555-67.836 36.742-32.914-2.1602-87-23.723-87-23.723-42.203-13.512-65.461-58.402-51.84-100.12 10.766-32.941 41.52-55.043 76.547-55.066 20.398 0 87.047 23.746 87.047 23.746 20.746 6.625 37.766 21.301 47.352 40.367 36.562 11.387 270.79 9.9102 387.77-237.9-49.535-26.629-80.664-77.605-80.664-134.35l0.003906-142.26c0-59.914 35.496-114 89.734-138.86-26.566-183.44-185.15-320.14-374.34-320.14-191.68 0-350.77 138.98-375.07 325.29 48.695 26.867 79.5 77.988 79.5 133.71v142.25c0 84.406-69.504 153.1-154.96 153.1s-154.96-68.676-154.96-153.09v-142.25c0-70.754 50.027-132.38 118.5-148.78 15.098-113.51 70.535-218.09 157.07-295.74 90.602-81.285 207.76-126.05 329.92-126.05 122.53 0 239.96 45.023 330.67 126.76 86.941 78.336 142.27 183.82 156.7 298.18 63.707 20.23 107.15 78.359 107.15 145.63z"}"></path></svg>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "#info.svelte-1guifgo{max-width:800px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page_key;
  let $locale, $$unsubscribe_locale;
  $$unsubscribe_page_key = subscribe(page_key, (value) => value);
  $$unsubscribe_locale = subscribe(locale, (value) => $locale = value);
  let { data } = $$props;
  let event;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  event = data.event;
  $$unsubscribe_page_key();
  $$unsubscribe_locale();
  return `<div class="${"container mx-auto pt-8 px-4"}">${validate_component(Html, "Html").$$render(
    $$result,
    {
      source: `<h1>${event.title}</h1>`,
      width: "text"
    },
    {},
    {}
  )}
  <div id="${"info"}" class="${"p-4 border border-neutral-25 rounded mt-8 mx-auto svelte-1guifgo"}">${each(event.dates, (date) => {
    return `<p class="${"flex pb-2"}"><span class="${"flex my-auto fill-neutral"}">${validate_component(Calendar, "Calendar").$$render($$result, { width: 20, height: 20 }, {}, {})}</span>

        <span class="${"pl-4 my-auto"}">${escape(gen_date(date.date, $locale))}</span>
        <span class="${"pl-10 flex my-auto fill-neutral"}">${validate_component(Time, "Time").$$render($$result, { width: 20, height: 20 }, {}, {})}</span><span class="${"pl-4 my-auto"}">${escape(gen_time(date.start_time, $locale))} - ${escape(gen_time(date.end_time, $locale))}</span>
    </p>`;
  })}
    ${event.location ? `<p class="${"flex pb-2"}"><span class="${"flex my-auto fill-neutral"}">${validate_component(Location, "Location").$$render($$result, { width: 20, height: 20 }, {}, {})}</span> <span class="${"pl-4 my-auto"}">${escape(event.location)}</span></p>` : ``}
    ${event.online ? `<p class="${"flex"}"><span class="${"flex my-auto fill-neutral"}">${validate_component(Headset, "Headset").$$render($$result, { width: 20, height: 20 }, {}, {})}</span> <span class="${"pl-4 my-auto"}">Online</span></p>` : ``}</div>
  <div class="${"mt-6"}">${validate_component(Html, "Html").$$render(
    $$result,
    {
      source: `<h2>Details</h2>` + event.description,
      width: "text"
    },
    {},
    {}
  )}</div>
</div>`;
});
export {
  Page as default
};
