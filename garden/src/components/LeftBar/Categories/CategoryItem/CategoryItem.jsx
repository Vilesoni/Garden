import React from "react";
import classes from "./CategoryItem.module.css";

const CategoryItem = (props) => {
  return <span className={classes.text}>#{props.text}</span>;
};
export default CategoryItem;
