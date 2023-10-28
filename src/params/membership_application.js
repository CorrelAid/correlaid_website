import {constructRe} from '$lib/js/helpers';

const re = constructRe([
  'navbar.volunteering.become_member.membership_application',
]);

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
  return re.test(param);
}
