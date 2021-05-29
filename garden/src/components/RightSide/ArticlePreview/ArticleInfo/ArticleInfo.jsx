import React from "react";
import classes from "./ArticleInfo.module.css";
import Info from "../../Info/Info";
import Button from "../../../UI/Button/Button";
import { withRouter } from "react-router-dom";
const ArticleInfo = (props) => {
  return (
    <div className={classes.ArticleInfo}>
      <div className={classes.articleTitle}>{props.title}</div>
      <div>
        <span className={classes.category}>#{props.category}</span>
      </div>
      <div className={classes.articleInfo}>
        <Info
          id={props.userId}
          date={props.date}
          img={props.img}
          userName={props.userName}
        />
      </div>
      <div className={classes.articlePreview}>{props.preview}</div>
      <div className={classes.articleMore}>
        <Button
          text="Читать далее"
          color="green"
          onClick={() => props.history.push(`/article?id=${props.id}`)}
        />
      </div>
    </div>
  );
};
export default withRouter(ArticleInfo);
