const re = new RegExp("^documents/dokumente");
function match(param) {
  return re.test(param);
}
export {
  match
};
