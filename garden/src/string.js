const isEmpty = (e) => {
  switch (e) {
    case "":
    case 0:
    case "0":
    case null:
    case false:
    case typeof e == "undefined":
    case " ":
      return true;
    default:
      return false;
  }
};
const isLogin = (login) => {
  const reg = /^[a-z0-9_-]/;
  return reg.test(String(login).toLowerCase());
};
const isEmail = (email) => {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(String(email).toLowerCase());
};
const isPassword = (password) => {
  const reg = /^[a-z0-9_-]{8,16}$/;
  return reg.test(String(password).toLowerCase());
};
const isName = (name) => {
  if (isEmpty(name)) {
    return true;
  }
  const reg = /^[a-zA-Za-яА-ЯЁё ]+$/;
  return reg.test(String(name).toLowerCase());
};
const isNumbers = (string) => {
  const reg = /^[0-9]+$/;
  return reg.test(String(string).toLowerCase());
}
module.exports = {
  isEmpty,
  isLogin,
  isEmail,
  isPassword,
  isName,
  isNumbers
};
