import { constructRe } from "$lib/js/helpers";

const re = constructRe(["footer.contact"])

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
    return re.test(param);
  }