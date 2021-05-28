import React from "react";
import classes from "./Warning.module.css";
const Warning = (props) => {
  const cls = [classes.warning, classes[props.display], classes[props.type]];
  return (
    <div className={cls.join(" ")}>
      {props.text}
    </div>
  );
};
export default Warning;
