import { i as constructRe } from "../../chunks/helpers.js";
const re = constructRe(["navbar.education.experts"]);
function match(param) {
  return re.test(param);
}
export {
  match
};
