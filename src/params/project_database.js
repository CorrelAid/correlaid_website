import {constructRe} from '$lib/js/helpers';

const re = constructRe(['navbar.using_data.project_database']);

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
  return re.test(param);
}
