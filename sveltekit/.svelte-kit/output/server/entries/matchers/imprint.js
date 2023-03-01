import { i as constructRe } from "../../chunks/helpers.js";
const re = constructRe(["footer.imprint"]);
function match(param) {
  return re.test(param);
}
export {
  match
};
