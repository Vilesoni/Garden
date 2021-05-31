import React from "react";
import { Link } from "react-router-dom";
import classes from "./Info.module.css";
import Pic from "../../UI/Pic/Pic";
const Info = (props) => {
  return (
    <div className={classes.Info}>
      <div className={classes.date}>{props.date}</div>
      <div className={classes.small}>
        <Pic src={props.img} size="small"/>
      </div>
      <div className={classes.user}>
        <Link to={`/profile?id=${props.id}`}>{props.userName}</Link>
      </div>
    </div>
  );
};
export default Info;
