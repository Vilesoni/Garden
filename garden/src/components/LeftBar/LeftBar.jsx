import React from "react";
import classes from "./LeftBar.module.css";
import Header from "./Header/Header.jsx";
import Categories from "./Categories/Categories.jsx";
import UsersRating from "./UsersRating/UsersRating.jsx";
const LeftBar = () => {
  return (
    <div className={classes.LeftBar}>
      <Header />
      <Categories />
      <UsersRating />
    </div>
  );
};
export default LeftBar;
