const setUser = (id, login, imgPath, admin) => {
  const user = [id, login, imgPath, admin];
  window.localStorage.setItem("user", JSON.stringify(user));
};
const getUser = () => {
  const user = window.localStorage.getItem("user");
  if (user !== null) {
    return eval(user).join(",").split(",");
  }
};
const deleteUser = () => {
  window.localStorage.removeItem("user");
};
module.exports = {
  setUser,
  getUser,
  deleteUser,
};
