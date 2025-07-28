import {constructRe} from '$lib/js/helpers';

const re = constructRe(['footer.privacy_policy']);

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
  return re.test(param);
}
