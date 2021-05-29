import React, { useState, useEffect } from "react";
import classes from "./Pic.module.css";
import avatar from "./default.png";
const Pic = (props) => {
  const [src, setSrc] = useState(avatar);
  useEffect(() => {
    setSrc(props.src);
  }, []);
  const cls = [classes.button, classes[props.size]];
  return (
    <div className={classes.container}>
      <img className={cls.join(" ")} src={src} onError={() => setSrc(avatar)} alt=""/>
    </div>
  );
};
export default Pic;
