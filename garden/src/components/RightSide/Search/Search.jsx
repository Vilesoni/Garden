import React, { useState, useEffect } from "react";
import axios from "../../../../axios/config";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import classes from "./Search.module.css";
import Button from "../../../UI/Button/Button";
import Pic from "../../../UI/Pic/Pic";
import Input from "../../../UI/Input/Input.jsx";
import search from "./search64px.png";
import localStorage from "../../../../localStorage";
import string from "../../../../string";

const Search = () => {
  const [query, setQuery] = useState("");
  const [userImg, setUserImg] = useState(null);
  const userId = localStorage.getUser();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const result = await axios.post("/api/users/get-image", {
        userId: userId,
      });
      setUserImg(result.data[0].imgPath);
    } catch (error) {
      console.error(error.message);
    }
  };
  console.log(userImg);
  return (
    <div className={`${classes.Search} ${classes.searchMarkup}`}>
      <div className={classes.input}>
        <Input
          type="text"
          placeholder="Поиск"
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className={classes.search}>
        <Tooltip arrow title="Поиск">
          <img
            src={search}
            onClick={() => {
              if (!string.isEmpty(query)) {
                window.location.href = `/results?query=${query}`;
              }
            }}
          />
        </Tooltip>
      </div>
      {userId === null ? (
        <Link to="/login">
          <Button text="Войти" type="green" />
        </Link>
      ) : (
        <Tooltip arrow title="Перейти в профиль">
          <Link to={`/profile/user?id=${userId}`}>
            <div className={classes.userProfile}>
              {userImg != null ? (
                <Pic
                  size="small"
                  src={userImg}
                />
              ) : (
                <Pic
                  size="small"
                  src=""
                />
              )}
            </div>
          </Link>
        </Tooltip>
      )}
    </div>
  );
};
export default Search;
