const setUser = (id, login, imgPath, admin) => {
  const user = [id, login, imgPath, admin];
  window.localStorage.setItem("user", JSON.stringify(user));
};
const getUserId = () => {
  if (window.localStorage.getItem("user")) {
    return JSON.parse(window.localStorage.getItem("user"))[0];
  }
};
const getUserLogin = () => {
  if (window.localStorage.getItem("user")) {
    return JSON.parse(window.localStorage.getItem("user"))[1];
  }
};
const getUserRights = () => {
  if (window.localStorage.getItem("user")) {
    return JSON.parse(window.localStorage.getItem("user"))[3];
  }
};
const deleteUser = () => {
  window.localStorage.clear();
};
module.exports = {
  setUser,
  getUserId,
  getUserLogin,
  getUserRights,
  deleteUser,
};
