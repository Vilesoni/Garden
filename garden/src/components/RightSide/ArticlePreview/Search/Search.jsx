import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import classes from "./Search.module.css";
import Input from "../../../UI/Input/Input.jsx";
import search from "./search64px.png";
import string from "../../../../string";
import ProfileLink from "./ProfileLink/ProfileLink";

const Search = () => {
  const [query, setQuery] = useState("");
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
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div>
        <Link to={string.isEmpty(query) ? `/` : `/results?query=${query}`}>
          <Tooltip arrow title="Поиск">
            <img className={classes.search} src={search} />
          </Tooltip>
        </Link>
      </div>
      <ProfileLink />
    </div>
  );
};
export default Search;
