import React, { useState } from "react";
import axios from "../../../axios/config";
import { Link } from "react-router-dom";
import bcrypt from "bcryptjs";
import classes from "./Logup.module.css";
import Button from "../../UI/Button/Button";
import Warning from "../../UI/Warning/Warning";
import Input from "../../UI/Input/Input.jsx";
import string from "../../../string";

const Logup = (props) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [warning, setWarning] = useState({
    text: "",
    type: "",
    display: "hide",
  });
  const [sended, setSended] = useState(false);
  const addUser = async () => {
    const result = await axios.post("/api/users/get-by-login", {
      login: login,
      email: email,
    });
    if (result.data === "ok") {
      setSended(true);
      setWarning({
        text: `Отправка письма для подтверждения регистрации...`,
        type: "info",
        display: "show",
      });
      const hashPassword = bcrypt.hashSync(password, 5);
      await axios.post("/api/send-mail-logup", {
        mail: email,
        login: login,
        // link: `http://localhost:3000/confirm/user?login=${login}&email=${email}&password=${hashPassword}`,
        link: `https://agitated-noether-80e9db.netlify.app/confirm/user?login=${login}&email=${email}&password=${hashPassword}`,
      });
      setWarning({
        text: `Письмо для подтверждения регистрации отправлено по адресу ${email}.`,
        type: "success",
        display: "show",
      });
      props.history.push("/");
    } else {
      setWarning({
        text: "Такой пользователь уже существует.",
        type: "warn",
        display: "show",
      });
    }
  };
  return (
    <div className={classes.Logup}>
      <div className={classes.form}>
        <Input
          placeholder="Имя пользователя"
          type="text"
          maxLength="16"
          onChange={(e) => {
            setWarning({ text: "", type: "", display: "hide" });
            setLogin(e.target.value);
          }}
        />
        <Input
          placeholder="E-mail"
          type="email"
          onChange={(e) => {
            setWarning({ text: "", type: "", display: "hide" });
            setEmail(e.target.value);
          }}
        />
        <Input
          placeholder="Пароль"
          type="password"
          maxLength="16"
          onChange={(e) => {
            setWarning({ text: "", type: "", display: "hide" });
            setPassword(e.target.value);
          }}
        />
        <Warning
          text={warning.text}
          display={warning.display}
          type={warning.type}
        />
        {!sended && (
          <Button
            text="Зарегистрироваться"
            color="blue"
            onClick={() => {
              if (
                string.isEmpty(login) ||
                string.isEmpty(email) ||
                string.isEmpty(password)
              ) {
                setWarning({
                  text: "Все поля обязательны для заполнения.",
                  type: "error",
                  display: "show",
                });
              } else {
                if (
                  !string.isLogin(login) ||
                  !string.isEmail(email) ||
                  !string.isPassword(password)
                ) {
                  setWarning({
                    text: "Данные введены неверно.",
                    type: "error",
                    display: "show",
                  });
                } else {
                  addUser();
                }
              }
            }}
          />
        )}
        <div className={classes.login_link}>
          <Link to="/login">
            <span className={classes.login}>Уже есть аккаунт? Войти</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Logup;
