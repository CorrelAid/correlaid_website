import { h as constructRe } from "../../chunks/helpers.js";
const re = constructRe(["navbar.events"]);
function match(param) {
  return re.test(param);
}
export {
  match
};
