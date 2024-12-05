import {constructRe} from '$lib/js/helpers';

const re = constructRe(['navbar.support']);

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
  return re.test(param);
}
