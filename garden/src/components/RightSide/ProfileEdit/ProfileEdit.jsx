import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "../../../axios/config";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import classes from "./ProfileEdit.module.css";
import string from "../../../string.js";
import Button from "../../UI/Button/Button.jsx";
import UploadFiles from "../../UploadFiles/UploadFiles";
import Pic from "../../UI/Pic/Pic.jsx";
import back from "./back.png";
import localStorage from "../../../localStorage";
import Warning from "../../UI/Warning/Warning";

const ProfileEdit = (props) => {
  const userId = localStorage.getUserId();
  const [login, setLogin] = useState("");
  const [fullName, setFullName] = useState("");
  const [img, setImg] = useState(null);
  const [warn, setWarn] = useState({ text: "", type: "", display: "hide" });
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const result = await axios.post("/api/users/get-by-id", {
        userId: userId,
      });
      setLogin(result.data[0].login);
      result.data[0].fullName !== null && setFullName(result.data[0].fullName);
      setImg(result.data[0].imgPath);
    } catch (error) {
      console.error(error.message);
    }
  };
  const UploadUpdate = (value) => {
    setImg(value);
  };
  const editUser = async (e) => {
    e.preventDefault();
    if (!string.isEmpty(login)) {
      if (string.isLogin(login) && string.isName(fullName)) {
        try {
          const result = await axios.post("/api/users/edit", {
            userId: userId,
            login: login,
            fullName: fullName,
            imgPath: img,
          });
          if (result.data === "edited") {
            props.history.push(`/profile?id=${userId}`);
          } else {
            setWarn({
              text: "Такой пользователь уже существует!",
              type: "warn",
              display: "show",
            });
          }
        } catch (error) {
          console.error(error.message);
        }
      } else {
        setWarn({
          text: "Проверьте правильность введенных данных",
          type: "warn",
          display: "show",
        });
      }
    } else {
      setWarn({
        text: "Поле Имя пользователя обязательно для заполнения",
        type: "warn",
        display: "show",
      });
    }
  };
  return (
    <div className={classes.ProfileEntered}>
      <div className={classes.back}>
        <Link to={`/profile?id=${userId}`}>
          <Tooltip arrow title="Назад">
            <img src={back} />
          </Tooltip>
        </Link>
      </div>
      <div className={classes.user_info}>
        <div className={classes.pic}>
          <Pic src={img} size="huge" />
        </div>
        <UploadFiles update={UploadUpdate} type="image" accept="image/*" />
        <div className={classes.info}>
          <input
            className={classes.input}
            value={login}
            maxLength="16"
            minLength="5"
            onChange={(e) => {
              setLogin(e.target.value);
              setWarn({ text: "", type: "", display: "hide" });
            }}
            placeholder="Имя пользователя"
          />
          <input
            className={classes.input}
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setWarn({ text: "", type: "", display: "hide" });
            }}
            maxLength="100"
            placeholder="Фамилия Имя"
          />
        </div>
        <Warning text={warn.text} type={warn.type} display={warn.display} />
        <div className={classes.button}>
          <Button text="Сохранить" color="blue" onClick={editUser} />
        </div>
      </div>
    </div>
  );
};
export default withRouter(ProfileEdit);
