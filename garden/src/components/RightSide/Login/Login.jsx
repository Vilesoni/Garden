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
    const result = await axios.post("/api/users/login", {
      login: login,
      password: password,
    });
    if (result.data.action === "ok") {
      localStorage.setUser(
        result.data.data.id,
        result.data.data.login,
        result.data.data.imgPath,
        result.data.data.admin
      );
      if (result.data.data.admin === 1) {
        props.history.push(`/admin`);
      } else {
        props.history.push(`/profile?id=${result.data.data.id}`);
      }
    } else {
      Warn("Проверьте имя пользователя или пароль", "error", "show");
    }
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
          <span>
            <Link to="/logup">
              <span className={classes.logup}>
                Нет аккаунта? Зарегистрироваться
              </span>
            </Link>
          </span>
          <span>
            <Link to="/recover">
              <span className={classes.logup}>Забыли пароль?</span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
