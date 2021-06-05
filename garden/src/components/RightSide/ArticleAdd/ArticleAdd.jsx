import React, { useState } from "react";
import axios from "../../../axios/config";
import { withRouter } from "react-router-dom";
import classes from "./ArticleAdd.module.css";
import Button from "../../UI/Button/Button.jsx";
import Textarea from "../../UI/Textarea/Textarea.jsx";
import Warning from "../../UI/Warning/Warning.jsx";
import Editor from "./Editor/Editor.jsx";
import Categories from "./Categories/Categories.jsx";
import UploadFile from "../../UploadFiles/UploadFiles";
import localStorage from "../../../localStorage.js";
import string from "../../../string.js";

const ArticleAdd = (props) => {
  const userId = localStorage.getUserId();
  const [warn, setWarn] = useState({
    text: "",
    type: "",
    display: "hide",
  });
  const [preview, setPreview] = useState("");
  return (
    <div>
      {isNaN(userId) ? (
        <Warning
          text="У вас нет доступа к данной странице"
          display="show"
          type="info"
        />
      ) : (
        <div className={classes.ArticleAdd}>
          <Categories />
          <div className={classes.preview}>
            <Textarea
              value={preview}
              placeholder="Краткое содержание"
              onChange={(e) => setPreview(e.target.value)}
            />
          </div>
          <UploadFile accept=".jpg,.png,.mp4" folder="articles" />
          <div className={classes.content}>
            <Editor />
          </div>
          <Warning text={warn.text} display={warn.display} type={warn.type} />
          <div className={classes.btn_container}>
            <Button text="Опубликовать" color="blue" onClick={() => {}} />
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(ArticleAdd);
