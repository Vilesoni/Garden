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

const ProfileEdit = (props) => {
  const [fullName, setFullName] = useState("");
  const [warning, setWarning] = useState("");
  const [img, setImg] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [login, setLogin] = useState(localStorage.getUser()[1]);
  const userId = localStorage.getUser()[0];
  function UploadUpdate(value) {
    setImg(value);
  }
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const result = await axios.post("/api/users/get-by-id", {
        userId: userId,
      });
      string.isEmpty(result.data[0].fullName)
        ? setFullName("")
        : setFullName(result.data[0].fullName);
        setUserImg(result.data[0].imgPath);
        setImg(result.data[0].imgPath);
    } catch (error) {
      console.error(error.message);
    }
  };
  const editUser = () => {
    try {
      axios
        .post("/api/users/edit", {
          userId: userId,
          login: login,
          fullName: fullName,
          imgPath: img,
        })
        .then((response) => {
          if (response.data[0].edited === 1) {
            props.history.push(`/profile?id=${userId}`);
          } else {
            setWarning("Такой пользователь уже существует");
          }
        });
    } catch (error) {
      console.error(error.message);
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
          <Pic src={userImg} size="huge" />
        </div>
        <UploadFiles update={UploadUpdate} accept=".jpg,.png"/>
        <div className={classes.info}>
          <input
            className={classes.input}
            onChange={(e) => {
              setLogin(e.target.value);
              setWarning("");
            }}
            value={login}
            placeholder="Имя пользователя"
          />
          <input
            className={classes.input}
            onChange={(e) => {
              setFullName(e.target.value);
              setWarning("");
            }}
            value={fullName}
            maxLength="100"
            placeholder="Фамилия Имя"
          />
        </div>
        <div className={classes.warning}>{warning}</div>
        <div className={classes.button}>
          <Button
            text="Сохранить"
            color="blue"
            onClick={() => {
              if (!string.isEmpty(login)) {
                if (!string.isLogin(login)) {
                  setWarning("Неверное имя пользователя");
                }
                if (!string.isName(fullName) && !string.isEmpty(fullName)) {
                  setWarning("Фамилия имя введены неверно");
                }
                if (string.isLogin(login)) {
                  editUser(userId, login, fullName, img);
                }
              } else {
                setWarning("Заполните обязательные поля");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default withRouter(ProfileEdit);
