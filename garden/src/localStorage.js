const setUser = (id) => {
  window.localStorage.setItem("user", id);
};
const getUser = () => {
  return window.localStorage.getItem("user");
};
const deleteUser = () => {
  window.localStorage.removeItem("user");
};
module.exports = {
  setUser,
  getUser,
  deleteUser,
};
