import { h as constructRe } from "../../chunks/helpers.js";
const re = constructRe(["navbar.projects_consulting.consulting"]);
function match(param) {
  return re.test(param);
}
export {
  match
};
