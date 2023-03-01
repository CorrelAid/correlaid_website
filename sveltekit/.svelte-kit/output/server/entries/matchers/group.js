import { i as constructRe } from "../../chunks/helpers.js";
const re = constructRe(["navbar.about.ethics_commission", "navbar.about.board"]);
function match(param) {
  return re.test(param);
}
export {
  match
};
