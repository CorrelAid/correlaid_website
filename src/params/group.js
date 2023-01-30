import { constructRes } from "$lib/js/helpers.js";

const re = constructRes(["navbar.about.ethics_commission", "navbar.about.board"])

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
    return re.test(param);
  }