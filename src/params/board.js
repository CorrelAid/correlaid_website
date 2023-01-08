import { constructRe } from "$lib/js/helpers.js";

const re = constructRe("navbar.about.org_struct.board")

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
    return re.test(param);
  }