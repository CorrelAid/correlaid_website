import { c as create_ssr_component, e as escape, d as add_attribute, v as validate_component } from "./index3.js";
import { E as External_Link } from "./External_Link.js";
const Link_Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { href } = $$props;
  let { text } = $$props;
  let { type = "" } = $$props;
  let { color } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  {
    if (color != "bg-secondary") {
      color = "bg-primary";
    }
  }
  return `<a class="${"rounded-md px-4 py-2 text-white shadow transition inline-flex items-center " + escape(String(color), true)}"${add_attribute("href", href, 0)}>${escape(text)}
    ${type == "external" ? `<span class="${"ml-1.5"}">${validate_component(External_Link, "ExternalLink").$$render($$result, { height: 20, width: 20 }, {}, {})}</span>` : ``}</a>`;
});
export {
  Link_Button as L
};
