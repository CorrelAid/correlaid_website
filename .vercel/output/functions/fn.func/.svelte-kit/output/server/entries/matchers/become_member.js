import { h as constructRe } from "../../chunks/helpers.js";
const re = constructRe(["navbar.community.become_member"]);
function match(param) {
  return re.test(param);
}
export {
  match
};
