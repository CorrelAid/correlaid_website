import { h as constructRe } from "../../chunks/helpers.js";
const re = constructRe(["navbar.education.learning_r"]);
function match(param) {
  return re.test(param);
}
export {
  match
};
