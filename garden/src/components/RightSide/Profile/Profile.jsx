import React, { useState, useEffect } from "react";
import axios from "../../../axios/config";
import { withRouter } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import classes from "./Profile.module.css";
import UserInfo from "./UserInfo/UserInfo.jsx";
import Articles from "./Articles/Articles.jsx";
import Warning from "../../UI/Warning/Warning";
import localStorage from "../../../localStorage";
import SyncLoader from "react-spinners/SyncLoader";

function getURLid() {
  let url = new URL(window.location.href);
  return url.searchParams.get("id");
}
const Profile = (props) => {
  const userId = parseInt(getURLid());
  const [url, setUrl] = useState("/api/users/get-by-id-articles");
  const [exist, setExist] = useState(false);
  const [display, setDisplay] = useState("hide");
  const [loading, setLooading] = useState(false);
  useEffect(() => {
    fetchData();
  }, [userId]);
  const fetchData = async () => {
    setLooading(true);
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
    setLooading(false);
  };
  return (
    <div className={classes.Profile}>
      {loading ? (
        <div className={classes.loader}>
          <SyncLoader color="#86a573" />
        </div>
      ) : exist ? (
        <div>
          <UserInfo userId={userId} />
          <div className={classes.nav}>
            {localStorage.getUserId() === userId ? (
              <div onClick={() => setUrl("/api/users/get-by-id-articles")}>
                <span className={classes.navLink}>Мои статьи</span>
                <Tooltip arrow title="Создать статью">
                  <span
                    className={classes.add}
                    onClick={() => props.history.push("/create/article")}
                  >
                    +
                  </span>
                </Tooltip>
              </div>
            ) : (
              <div className={classes.title}>Статьи</div>
            )}
            {localStorage.getUserId() === userId ? (
              <>
                <div onClick={() => setUrl("/api/users/get-by-approved")}>
                  <span className={classes.navLink}>Не подтверждено</span>
                </div>
                <div
                  onClick={() => setUrl("/api/users/get-by-id-articles-liked")}
                >
                  <span className={classes.navLink}>Понравилось</span>
                </div>
              </>
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
