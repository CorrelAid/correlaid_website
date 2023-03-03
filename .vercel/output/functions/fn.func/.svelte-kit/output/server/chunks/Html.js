import { c as create_ssr_component, e as escape } from "./index3.js";
const Html = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { source } = $$props;
  let { options = "" } = $$props;
  let { width } = $$props;
  if ($$props.source === void 0 && $$bindings.source && source !== void 0)
    $$bindings.source(source);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  return `<article class="${"prose max-w-none container mx-auto px-4 text-neutral prose-h1:text-3xl prose-h1:text-neutral prose-h2:text-neutral " + escape(options, true) + " " + escape(width == "text" ? "text_width" : "", true)}"><!-- HTML_TAG_START -->${source}<!-- HTML_TAG_END --></article>`;
});
export {
  Html as H
};
