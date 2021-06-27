import React, { useState, useEffect } from "react";
import axios from "../../../axios/config";
import { withRouter } from "react-router-dom";
import classes from "./Recover.module.css";
import Button from "../../UI/Button/Button";
import Warning from "../../UI/Warning/Warning";
import Input from "../../UI/Input/Input";
import string from "../../../string";

const Recover = (props) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [warn, setWarn] = useState({ text: "", type: "", display: "hide" });
  const [sended, setSended] = useState(false);
  const sendMail = async () => {
    if (!string.isEmpty(login) && !string.isEmpty(email)) {
      if (string.isLogin(login) && string.isEmail(email)) {
        setSended(true);
        setWarn({
          text: `Отправка письма для восстановления пароля...`,
          type: "info",
          display: "show",
        });
        const result = await axios.post("/api/send-mail-password-reset", {
          mail: email,
          login: login,
        });
        if (result.data === "sended") {
          setWarn({
            text: `Письмо для восстановления пароля было отправлено по адресу ${email}`,
            type: "success",
            display: "show",
          });
        }
        if (result.data === "unexist") {
          setWarn({
            text: `Такого пользователя не существует`,
            type: "error",
            display: "show",
          });
        }
      } else {
        setWarn({
          text: "Данные введены неверно",
          type: "error",
          display: "show",
        });
      }
    } else {
      setWarn({
        text: "Все поля обязательны для заполнения",
        type: "error",
        display: "show",
      });
    }
  };
  useEffect(() => {
    if (warn.type === "success") {
      const timer = setTimeout(() => {
        setWarn({ text: "", type: "", display: "hide" });
        props.history.push("/");
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [warn]);
  return (
    <div className={classes.Login}>
      <div className={classes.Form}>
        <Input
          placeholder="Имя пользователя"
          type="text"
          maxLength="16"
          onChange={(e) => {
            setLogin(e.target.value);
            setWarn({ text: "", type: "", display: "hide" });
          }}
        />
        <Input
          placeholder="Email"
          maxLength="100"
          onChange={(e) => {
            setEmail(e.target.value);
            setWarn({ text: "", type: "", display: "hide" });
          }}
        />
        <Warning text={warn.text} display={warn.display} type={warn.type} />
        {!sended && (
          <Button text="Восстановить пароль" color="blue" onClick={sendMail} />
        )}
      </div>
    </div>
  );
};

export default withRouter(Recover);
