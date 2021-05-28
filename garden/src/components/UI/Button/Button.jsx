import React from "react";
import classes from "./Button.module.css";
const Button = (props) => {
  const cls = [classes.button, classes[props.color]];
  return (
    <button className={cls.join(" ")} onClick={props.onClick}>
      {props.text}
    </button>
  );
};
export default Button;
