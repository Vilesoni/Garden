import React from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
const Header = (props) => {
  return (
    <div className={classes.Header}>
      <Link to="/">
        <div className={classes.logoText}>
          <p>Сад и Огород</p>
        </div>
      </Link>
    </div>
  );
};
export default Header;
