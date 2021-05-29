import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./CategoryItem.module.css";

const CategoryItem = (props) => {
  return (
    <span className={classes.text}>
      <NavLink
        to={`/category?id=${props.id}`}
      >
        #{props.text}
      </NavLink>
    </span>
  );
};
export default CategoryItem;
