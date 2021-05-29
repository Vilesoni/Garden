import React from "react";
import classes from "./Input.module.css";
const Input = (props) => {
  const cls = [classes.input, classes[props.type]];
  return (
    <input
      value={props.value}
      type={props.type}
      className={cls.join(" ")}
      onChange={props.onChange}
      placeholder={props.placeholder}
      maxLength={props.maxLength}
      pattern={props.pattern}
    />
  );
};
export default Input;
