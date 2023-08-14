import {constructRe} from '$lib/js/helpers';

const re = constructRe(['navbar.community.founding_lc']);

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
  return re.test(param);
}
