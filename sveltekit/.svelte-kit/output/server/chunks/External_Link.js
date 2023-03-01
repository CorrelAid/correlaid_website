import { c as create_ssr_component, d as add_attribute } from "./index3.js";
const External_Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width } = $$props;
  let { height } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  return `<svg${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}" class="${""}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"}"></path></svg>`;
});
export {
  External_Link as E
};
