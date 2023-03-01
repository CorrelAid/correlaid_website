import { constructRe } from "$lib/js/helpers";

const re = constructRe(["navbar.about.ethics_commission", "navbar.about.board"])

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
    return re.test(param);
  }