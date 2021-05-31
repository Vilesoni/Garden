import React, { useState } from "react";
import axios from "../../../axios/config";
import { Link } from "react-router-dom";
import classes from "./Logup.module.css";
import Button from "../../UI/Button/Button";
import Warning from "../../UI/Warning/Warning";
import Input from "../../UI/Input/Input.jsx";
import localStorage from "../../../localStorage";
import string from "../../../string";

const Logup = (props) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [warning, setWarning] = useState("");
  const [display, setDisplay] = useState("hide");
  const [type, setType] = useState("");

  const addUser = async () => {
    await axios
      .post("/api/users/logup", {
        login: login,
        email: email,
        password: password,
      })
      .then((response) => {
        if (isNaN(response.data[0].inserted)) {
          localStorage.setUser(
            response.data[0].id,
            response.data[0].login,
            response.data[0].imgPath,
            response.data[0].admin
          );
          props.history.push(`/profile?id=${response.data[0].id}`);
        } else {
          Warn("Такой пользователь уже существует.", "warn", "show");
        }
      });
  };
  const Warn = (text, type, display) => {
    setWarning(text);
    setType(type);
    setDisplay(display);
  };
  return (
    <div className={classes.Logup}>
      <div className={classes.form}>
        <Input
          placeholder="Имя пользователя"
          type="text"
          maxLength="16"
          onChange={(e) => {
            Warn("", "", "hide");
            setLogin(e.target.value);
          }}
        />
        <Input
          placeholder="E-mail"
          type="email"
          pattern=".+@"
          onChange={(e) => {
            Warn("", "", "hide");
            setEmail(e.target.value);
          }}
        />
        <Input
          placeholder="Пароль"
          type="password"
          maxLength="16"
          onChange={(e) => {
            Warn("", "", "hide");
            setPassword(e.target.value);
          }}
        />
        <Warning text={warning} display={display} type={type} />
        <Button
          text="Зарегистрироваться"
          color="blue"
          onClick={() => {
            if (
              string.isEmpty(login) ||
              string.isEmpty(email) ||
              string.isEmpty(password)
            ) {
              Warn("Все поля обязательны для заполнения.", "error", "show");
            } else {
              if (!string.isLogin(login)) {
                Warn("Неверное имя пользователя.", "error", "show");
              }
              if (!string.isEmail(email)) {
                Warn("Неверный e-mail.", "error", "show");
                setWarning("Неверный e-mail");
              }
              if (!string.isPassword(password)) {
                Warn("Неверный пароль.", "error", "show");
              } else {
                addUser();
              }
            }
          }}
        />
        <Link to="/login">
          <p className={classes.login}>Уже есть аккаунт? Войти</p>
        </Link>
      </div>
    </div>
  );
};

export default Logup;
