import React, { useState, useEffect } from "react";
import axios from "../../../axios/config";
import classes from "./Confirm.module.css";
import Input from "../../UI/Input/Input";
import Warning from "../../UI/Warning/Warning";
import Button from "../../UI/Button/Button";
import localStorage from "../../../localStorage";
import string from "../../../string";

const Confirm = (props) => {
  const login = new URL(window.location.href).searchParams.get("login");
  const password = new URL(window.location.href).searchParams.get("password");
  const email = new URL(window.location.href).searchParams.get("email");
  const [code, setCode] = useState(null);
  const [warning, setWarning] = useState({
    text: "",
    type: "",
    display: "hide",
  });
  const [confirmed, setConfirmed] = useState(false);
  const addUser = async () => {
    if (!string.isEmpty(code)) {
      if (string.isNumbers(code)) {
        try {
          const result = await axios.post("/api/users/logup", {
            login: login,
            password: password,
            email: email,
            code: code,
          });
          if (result.data.action === "ok") {
            setConfirmed(false);
            localStorage.setUser(
              result.data.data.id,
              result.data.data.login,
              result.data.data.imgPath,
              result.data.data.admin
            );
            props.history.push(`/`);
          } else {
            setWarning({
              text: "Не удалось зарегистрироваться.",
              type: "error",
              display: "show",
            });
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        setWarning({
          text: "Неверный формат кода.",
          type: "warn",
          display: "show",
        });
      }
    } else {
      setWarning({
        text: "Поле Код обязательно для заполнения.",
        type: "error",
        display: "show",
      });
    }
  };
  return (
    <div className={classes.Confirm}>
      <div className={classes.form}>
        <Input
          placeholder="Код"
          type="text"
          maxLength="10"
          onChange={(e) => {
            setWarning({ text: "", type: "", display: "hide" });
            setCode(e.target.value);
          }}
        />
        <Warning
          text={warning.text}
          type={warning.type}
          display={warning.display}
        />
        {!confirmed && (
          <Button text="Подтвердить" color="blue" onClick={addUser} />
        )}
      </div>
    </div>
  );
};

export default Confirm;
