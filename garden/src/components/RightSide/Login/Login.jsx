import React, { useState } from "react";
import axios from "../../../axios/config";
import { Link, withRouter } from "react-router-dom";
import classes from "./Login.module.css";
import Button from "../../UI/Button/Button";
import Warning from "../../UI/Warning/Warning";
import Input from "../../UI/Input/Input";
import localStorage from "../../../localStorage";
import string from "../../../string";

const Login = (props) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [display, setDisplay] = useState("hide");
  const [type, setType] = useState("");
  const userLogin = async () => {
    await axios
      .post("/api/users/login", {
        login: login,
        password: password,
      })
      .then((response) => {
        if (response.data.length !== 0) {
          props.history.push(`/profile?id=${response.data[0].id}`);
          localStorage.setUser(
            response.data[0].id,
            response.data[0].login,
            response.data[0].imgPath,
            response.data[0].admin
          );
        } else {
          Warn("Проверьте имя пользователя или пароль", "error", "show");
        }
      });
  };
  const Warn = (text, type, display) => {
    setWarning(text);
    setType(type);
    setDisplay(display);
  };
  return (
    <div className={classes.Login}>
      <div className={classes.Form}>
        <Input
          placeholder="Имя пользователя"
          type="text"
          onChange={(e) => {
            Warn("", "", "hide");
            setLogin(e.target.value);
          }}
        />
        <Input
          placeholder="Пароль"
          type="password"
          onChange={(e) => {
            Warn("", "", "hide");
            setPassword(e.target.value);
          }}
        />
        <Warning text={warning} display={display} type={type} />
        <Button
          text="Войти"
          color="blue"
          onClick={() => {
            if (!string.isEmpty(login) && !string.isEmpty(password)) {
              userLogin();
            } else {
              Warn("Все поля обязательны для заполнения.", "error", "show");
            }
          }}
        />
        <div className={classes.links}>
          <Link to="/logup">
            <p className={classes.logup}>Нет аккаунта? Зарегистрироваться</p>
          </Link>
          {/* <Link to="/recover">
            <p className={classes.logup}>Забыли пароль?</p>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
