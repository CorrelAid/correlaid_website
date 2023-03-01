import { i as constructRe } from "../../chunks/helpers.js";
const re = constructRe(["navbar.data4good.projects"]);
function match(param) {
  return re.test(param);
}
export {
  match
};
