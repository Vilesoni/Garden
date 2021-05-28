import React, {useState, useEffect} from "react";
import classes from "./Pic.module.css";
import avatar from "./default.png"
const Pic = (props) => {
  const [src, setSrc] = useState(avatar);
  useEffect(() => {
    if (props.src !== "") {
      setSrc(props.src)
    }
  }, []);
  const cls = [classes.button, classes[props.size]];
  return (
    <div className={classes.container}>
      <img className={cls.join(" ")} src={src} />
    </div>
  );
};
export default Pic;
