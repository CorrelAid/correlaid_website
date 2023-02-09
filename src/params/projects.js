
import { constructRe } from "$lib/js/helpers.js";

const re = constructRe(["navbar.data4good.projects"])

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
    return re.test(param);
  }