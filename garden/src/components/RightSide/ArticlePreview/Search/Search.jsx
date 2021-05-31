import React, { useState, useEffect } from "react";
import axios from "../../../../axios/config"
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
  const userId = localStorage.getUser()[0];
  const [userImg, setUserImg] = useState(null);
  useEffect(() => {
    fetchData();
    const location = window.location.pathname;
    if (location === "/" || location === "/category") {
      setQuery("");
    }
  }, [window.location.href]);
  const fetchData = async () => {
    try {
      const result = await axios.post("/api/users/get-by-id", {
        userId: userId
      })
      setUserImg(result.data[0].imgPath);
    } catch (error) {
      console.error(error.message)
    }
  }
  return (
    <div className={`${classes.Search} ${classes.searchMarkup}`}>
      <div className={classes.input}>
        <Input
          value={query}
          type="text"
          placeholder="Поиск"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>
      <div>
        <Link to={string.isEmpty(query) ? `/` : `/results?query=${query}`}>
          <Tooltip arrow title="Поиск">
            <img className={classes.search} src={search} />
          </Tooltip>
        </Link>
      </div>
      {isNaN(userId) ? (
        <Link to="/login">
          <Button text="Войти" color="blue" />
        </Link>
      ) : (
        <Tooltip arrow title="Перейти в профиль">
          <Link to={`/profile?id=${userId}`}>
            <div className={classes.userProfile}>
              {isNaN(userImg) || userImg === null? (
                <Pic size="small" src={userImg} />
              ) : (
                <Pic size="small" src="" />
              )}
            </div>
          </Link>
        </Tooltip>
      )}
    </div>
  );
};
export default Search;
