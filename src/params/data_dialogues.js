import { constructRe } from "$lib/js/helpers.js";

const re = constructRe("navbar.data4good.nonprofits.data_dialogues")

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
    return re.test(param);
  }