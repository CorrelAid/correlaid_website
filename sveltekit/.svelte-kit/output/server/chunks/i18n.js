import { d as derived, w as writable } from "./index2.js";
import { t as translate } from "./helpers.js";
const locale = writable("de");
const t = derived(
  locale,
  ($locale) => (key, vars = {}) => translate($locale, key, vars)
);
export {
  locale as l,
  t
};
