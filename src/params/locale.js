/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
    return /^en/.test(param);
  }