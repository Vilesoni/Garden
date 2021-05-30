const safeEval = require("safe-eval");

const setUser = (id, login, imgPath, admin) => {
  const user = [id, login, imgPath, admin];
  window.localStorage.setItem("user", JSON.stringify(user));
};
const getUser = () => {
  const user = window.localStorage.getItem("user");
  if (user !== null) {
    return safeEval(user).join(",").split(",");
  }
  return [];
};
const getUserId = () => {
  return getUser().length === 0 ? null : getUser()[0];
};
const getUserImg = () => {
  return getUser().length === 0 ? null : getUser()[2];
};
const deleteUser = () => {
  window.localStorage.removeItem("user");
};
module.exports = {
  setUser,
  getUser,
  getUserId,
  getUserImg,
  deleteUser,
};
