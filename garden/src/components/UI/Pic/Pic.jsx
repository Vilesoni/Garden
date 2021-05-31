import React from "react";
import classes from "./Pic.module.css";
import avatar from "./default.png";
const Pic = (props) => {
  const errUrl = avatar;
  const src = props.src === null ? avatar : `/images/${props.src}`;
  const cls = [classes.container, classes[props.size]];
  return (
    <div className={cls.join(" ")}>
      <img
        src={src}
        onError={(e) => {
          e.target.src = errUrl;
        }}
        alt=""
      />
    </div>
  );
};
export default Pic;
