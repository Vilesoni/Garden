const user = window.localStorage.getItem("user");
const setUser = (id, login, imgPath, admin) => {
  const user = [id, login, imgPath, admin];
  window.localStorage.setItem("user", JSON.stringify(user));
};
const getUserId = () => {
  if (user) {
    return JSON.parse(user)[0];
  }
};
const deleteUser = () => {
  window.localStorage.clear();
};
module.exports = {
  setUser,
  getUserId,
  deleteUser,
};
