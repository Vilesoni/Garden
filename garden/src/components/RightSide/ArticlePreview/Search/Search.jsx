import React, { useState, useEffect } from "react";
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
  const userId = localStorage.getUser();
  useEffect(() => {
    const location = window.location.pathname;
    if (location === "/" || location === "/category") {
      setQuery("");
    }
  }, [window.location.href]);
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
      {userId === null ? (
        <Link to="/login">
          <Button text="Войти" type="green" />
        </Link>
      ) : (
        <Tooltip arrow title="Перейти в профиль">
          <Link to={`/profile/user?id=${userId}`}>
            {/* <div className={classes.userProfile}>
              {userImg != null ? (
                <Pic size="small" src={userImg} />
              ) : (
                <Pic size="small" src="" />
              )}
            </div> */}
          </Link>
        </Tooltip>
      )}
    </div>
  );
};
export default Search;
