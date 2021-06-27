import React, { useState } from "react";
import axios from "../../../axios/config";
import { withRouter } from "react-router-dom";
import classes from "./SetNewPassword.module.css";
import Button from "../../UI/Button/Button";
import Warning from "../../UI/Warning/Warning";
import Input from "../../UI/Input/Input";
import localStorage from "../../../localStorage";
import string from "../../../string";

const SetNewPassword = (props) => {
  const login = new URL(window.location.href).searchParams.get("login");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [warn, setWarn] = useState({ text: "", type: "", display: "hide" });
  const [changed, setChanged] = useState(false);
  const updatePassword = async () => {
    if (!string.isEmpty(password) && !string.isEmpty(code)) {
      if (string.isPassword(password) && string.isNumbers(code)) {
        setChanged(true);
        setWarn({ text: "Изменение пароля...", type: "info", display: "show" });
        try {
          const result = await axios.post("/api/users/password-edit", {
            login: login,
            password: password,
            code: code,
          });
          if (result.data.action === "edited") {
            localStorage.setUser(
              result.data.data.id,
              login,
              result.data.data.imgPath,
              result.data.data.admin
            );
            props.history.push("/");
          } else {
            setWarn({
              text: "Не удалось изменить пароль",
              type: "warn",
              display: "show",
            });
            setChanged(false);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        setWarn({
          text: "Проверьте правильность введенных данных",
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
  return (
    <div className={classes.Login}>
      <div className={classes.Form}>
        <div className={classes.login}>{login}</div>
        <Input
          placeholder="Код"
          type="text"
          maxLength="10"
          onChange={(e) => {
            setCode(e.target.value);
            setWarn({ text: "", type: "", display: "hide" });
          }}
        />
        <Input
          placeholder="Новый пароль"
          type="password"
          maxLength="16"
          onChange={(e) => {
            setPassword(e.target.value);
            setWarn({ text: "", type: "", display: "hide" });
          }}
        />
        <Warning text={warn.text} display={warn.display} type={warn.type} />
        {!changed && (
          <Button
            text="Обновить пароль"
            color="blue"
            onClick={updatePassword}
          />
        )}
      </div>
    </div>
  );
};

export default withRouter(SetNewPassword);
