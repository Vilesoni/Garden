import React from "react";
import classes from "./Pic.module.css";
import avatar from "./default.png";
const Pic = (props) => {
  const errUrl = avatar
  const src = props.src === null ? avatar : `/images/${props.src}`;
  const cls = [classes.img, classes[props.size]];
  return (
    <div className={classes.container}>
      <img
        className={cls.join(" ")}
        src={src}
        onError={(e) => {e.target.src=errUrl}}
        alt=""
      />
    </div>
  );
};
export default Pic;
