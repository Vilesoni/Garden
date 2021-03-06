import React, { useEffect, useState } from "react";
import axios from "../../../../../axios/config";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import classes from "./ProfileLink.module.css";
import Button from "../../../../UI/Button/Button";
import Pic from "../../../../UI/Pic/Pic";
import localStorage from "../../../../../localStorage";

const ProfileLink = () => {
  const userId = localStorage.getUserId();
  const userRights = localStorage.getUserRights();
  const [userImg, setUserImg] = useState(null);
  const [link, setLink] = useState("");
  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, []);
  const fetchData = async () => {
    try {
      const result = await axios.post("/api/users/get-by-id", {
        userId: userId,
      });
      setUserImg(result.data[0].imgPath);
      userRights == 1 ? setLink(`/admin`) : setLink(`/profile?id=${userId}`);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div>
      {isNaN(userId) ? (
        <Link to="/login">
          <Button text="Войти" color="blue" />
        </Link>
      ) : (
        <Tooltip arrow title={localStorage.getUserLogin()}>
          <div className={classes.userProfile}>
            <Link to={link}>
              {isNaN(userImg) || userImg === null ? (
                <Pic size="small" src={userImg} />
              ) : (
                <Pic size="small" src="" />
              )}
            </Link>
          </div>
        </Tooltip>
      )}
    </div>
  );
};
export default ProfileLink;
