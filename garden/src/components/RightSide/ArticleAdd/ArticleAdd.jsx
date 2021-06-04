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
  const [category, setCategory] = useState(0);
  const [preview, setPreview] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [html, setHtml] = useState("");
  const [warnDisplay, setWarnDisplay] = useState("hide");
  const [warnText, setWarnText] = useState("");
  const userId = localStorage.getUserId();
  function EditorUpdate(value, html, warn) {
    setContent(value);
    setHtml(html);
    setWarnDisplay(warn);
  }
  function CategoryUpdate(value) {
    setCategory(value);
    setWarnDisplay("hide");
  }
  function UploadUpdate(fileName) {
    setFile(fileName);
  }
  function GetTitle() {
    var tmp = html.match("<h1>(.*)</h1>");
    if (tmp !== null) {
      console.log(tmp[1]);
      return tmp[1];
    }
    return false;
  }
  function GetContent() {
    var length = GetTitle().length + 6;
    if (length !== null) {
      return content.substr(length);
    }
    return false;
  }
  function Check(param) {
    switch (param) {
      case string.isEmpty(param):
      case param === 0:
        setWarnDisplay("show");
        setWarnText("Все поля обязательны для заполнения");
        return false;
      default:
        setWarnDisplay("hide");
        return true;
    }
  }
  const Add = async () => {
    try {
      const result = await axios.post("/api/articles/add", {
        userId: userId,
        title: GetTitle(),
        preview: preview,
        content: GetContent(),
        category: category,
        imgPath: file,
      });
      if (result.data.length != 0) props.history.push(`/profile?id=${userId}`);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div >
      {isNaN(userId) ? (
        <Warning
          text="У вас нет доступа к данной странице"
          display="show"
          type="info"
        />
      ) : (
        <div className={classes.ArticleAdd}>
          <Categories update={CategoryUpdate} />
          <div className={classes.preview}>
            <Textarea
              placeholder="Краткое содержание"
              onChange={(e) => {
                setPreview(e.target.value);
                setWarnDisplay("hide");
              }}
            />
          </div>
          <UploadFile accept=".jpg,.png,.mp4" folder="articles"/>
          <div className={classes.content}>
            <Editor update={EditorUpdate} />
          </div>
          <Warning text={warnText} display={warnDisplay} type="error" />
          <div className={classes.btn_container}>
            <Button
              text="Опубликовать"
              color="blue"
              onClick={() => {
                if (
                  Check(GetTitle()) &&
                  Check(GetContent()) &&
                  Check(preview) &&
                  Check(category)
                ) {
                  Add();
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(ArticleAdd);
