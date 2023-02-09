
import { constructRe } from "$lib/js/helpers.js";

const re = constructRe(["navbar.education.learning_r"])

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
    return re.test(param);
  }