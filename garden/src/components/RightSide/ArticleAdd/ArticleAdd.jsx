import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "../../../axios/config";
import classes from "./ArticleAdd.module.css";
import Button from "../../UI/Button/Button";
import Textarea from "../../UI/Textarea/Textarea";
import Warning from "../../UI/Warning/Warning";
import Editor from "./Editor/Editor";
import Categories from "./Categories/Categories";
import UploadFiles from "../../UploadFiles/UploadFiles";
import localStorage from "../../../localStorage";
import string from "../../../string";

const ArticleAdd = (props) => {
  const [category, setCategory] = useState(0);
  const [preview, setPreview] = useState("");
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState(null);
  const [warnDisplay, setWarnDisplay] = useState("hide");
  const [warnText, setWarnText] = useState("");
  const userId = localStorage.getUser()[0];
  const CategoryUpdate = (categoryId) => {
    setCategory(categoryId);
  };
  const EditorUdate = (text) => {
    setContent(text);
  }
  const Add = (e) => {
    e.preventDefault();
    try {
      axios.post("/api/articles/add", {
        userId: userId,
        title: "title",
        preview: preview,
        content: "cont",
        category: category,
        imgPath: fileName,
      });
      props.history.push(`/profile?id=${userId}`);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className={classes.ArticleAdd}>
      {isNaN(userId) ? (
        <Warning
          text="У Вас нет прав для просмотра данной сраницы"
          display="show"
          type="info"
        />
      ) : (
        <div>
          <Categories update={CategoryUpdate} />
          <div className={classes.preview}>
            <Textarea
              placeholder="Краткое содержание"
              onChange={(e) => 
                setPreview(e.target.value)}
            />
          </div>
          <UploadFiles update={""} accept=".jpg,.png.,.mp4" />
          <div className={classes.content}>
            <Editor update={EditorUdate} />
          </div>
          <Warning text={warnText} display={warnDisplay} type="error" />
          <div className={classes.btn_container}>
            <Button text="Опубликовать" color="blue" onClick={Add} />
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(ArticleAdd);
