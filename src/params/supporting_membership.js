import {constructRe} from '$lib/js/helpers';

const re = constructRe(['navbar.support.supporting_membership']);

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
  return re.test(param);
}
