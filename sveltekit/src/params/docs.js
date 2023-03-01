import { constructRe } from "$lib/js/helpers";

const re = new RegExp("^documents/dokumente");
/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
    return re.test(param);
  }