import {constructRe} from '$lib/js/helpers';

const re = constructRe(['navbar.education.communicating_data']);

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
  return re.test(param);
}
