import React, { useState, useEffect } from "react";
import axios from "../../../axios/config";
import { withRouter } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import classes from "./Profile.module.css";
import UserInfo from "./UserInfo/UserInfo.jsx";
import Articles from "./Articles/Articles.jsx";
import Warning from "../../UI/Warning/Warning";
import localStorage from "../../../localStorage";

function getURLid() {
  let url = new URL(window.location.href);
  return url.searchParams.get("id");
}
const Profile = (props) => {
  const userId = getURLid();
  const [url, setUrl] = useState("/api/users/get-by-id-articles");
  const [exist, setExist] = useState(false);
  const [display, setDisplay] = useState("hide");
  useEffect(() => {
    fetchData();
  }, [userId]);
  const fetchData = async () => {
    await axios
      .post("/api/users/get-by-id", {
        userId: userId,
      })
      .then((response) => {
        if (response.data.length === 0) {
          setExist(false);
          setDisplay(true);
        } else {
          setExist(true);
          setDisplay(false);
        }
      });
  };
  return (
    <div className={classes.Profile}>
      {exist ? (
        <div>
          <UserInfo userId={userId} />
          <div className={classes.nav}>
            {localStorage.getUser()[0] === userId ? (
              <div onClick={() => setUrl("/api/users/get-by-id-articles")}>
                <span className={classes.navLink}>Мои статьи</span>
                <Tooltip arrow title="Создать статью">
                  <span className={classes.add} onClick={
                    () => props.history.push("/create/article")
                  }>+</span>
                </Tooltip>
              </div>
            ) : (
              <div className={classes.title}>Статьи</div>
            )}
            {localStorage.getUser()[0] === userId ? (
              <div
                onClick={() => setUrl("/api/users/get-by-id-articles-liked")}
              >
                <span className={classes.navLink}>Понравилось</span>
              </div>
            ) : (
              false
            )}
          </div>
          <Articles userId={userId} url={url} />
        </div>
      ) : (
        <Warning
          text="Такого пользователя не существует"
          display={display}
          type="info"
        />
      )}
    </div>
  );
};
export default withRouter(Profile);
