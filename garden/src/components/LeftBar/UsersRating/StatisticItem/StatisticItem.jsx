import React from "react";
import { Link } from "react-router-dom";
import classes from "./StatisticItem.module.css";
import Pic from "../../../UI/Pic/Pic";

const StatisticItem = (props) => {
  const imgPath = props.imgPath;
  return (
    <div className={classes.StatisticItem}>
      <div className={classes.img}>
        {imgPath !== null ? (
          <Pic size="small" src={`${imgPath}`} />
        ) : (
          <Pic size="small" src="" />
        )}
      </div>
      <div className={classes.name}>
        <Link to={`/profile?id=${props.id}`}>{props.login}</Link>
      </div>
      <div className={classes.rating}>{props.rating}</div>
    </div>
  );
};

export default StatisticItem;
