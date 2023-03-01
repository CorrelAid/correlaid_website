import { i as constructRe } from "../../chunks/helpers.js";
const re = constructRe(["navbar.about"]);
function match(param) {
  return re.test(param);
}
export {
  match
};
