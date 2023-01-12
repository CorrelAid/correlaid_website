import { constructRe } from "$lib/js/helpers.js";

const re = constructRe("footer.imprint")

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
    return re.test(param);
  }