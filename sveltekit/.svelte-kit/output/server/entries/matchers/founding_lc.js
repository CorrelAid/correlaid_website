import { i as constructRe } from "../../chunks/helpers.js";
const re = constructRe(["navbar.community.founding_lc"]);
function match(param) {
  return re.test(param);
}
export {
  match
};
