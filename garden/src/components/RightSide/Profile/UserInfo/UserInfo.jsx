import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "../../../../axios/config";
import classes from "./UserInfo.module.css";
import Pic from "../../../UI/Pic/Pic";
import localStorage from "../../../../localStorage";
import edit from "./edit.png";
import exit from "./exit.png";

const UserInfo = (props) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetchData();
  }, [props.userId]);
  const fetchData = async () => {
    try {
      const result = await axios.post("/api/users/get-by-id", {
        userId: props.userId,
      });
      setUser(result.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className={classes.UserInfo}>
      {user.map((item) => (
        <div key={item.id}>
          <div className={classes.pic}>
            <Pic size="huge" src={item.imgPath} />
          </div>
          <div className={classes.info}>
            <div className={classes.login}>
              {item.login}
              {props.userId === localStorage.getUserId()? (
                <div className={classes.edit}>
                  <Link to={`/profile/edit?id=${props.userId}`}>
                    <Tooltip arrow title="Редактировать профиль">
                      <img className={classes.img} src={edit} />
                    </Tooltip>
                  </Link>
                </div>
              ) : (
                false
              )}
            </div>
            <div>
              <span className={classes.rating}>{item.rating}</span>
            </div>
            <div>{item.email}</div>
            <div className={classes.fullName}>{item.fullName}</div>
          </div>
          <div className={classes.exit}>
            {props.userId === localStorage.getUserId() ? (
              <Link to="/">
                <Tooltip title="Выйти" arrow>
                  <img
                    className={classes.img}
                    src={exit}
                    onClick={() => {
                      localStorage.deleteUser("user");
                    }}
                  />
                </Tooltip>
              </Link>
            ) : (
              false
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default UserInfo;
