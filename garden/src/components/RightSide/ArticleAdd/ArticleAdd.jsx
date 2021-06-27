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
import MarkdownIt from "markdown-it";
const mdParser = new MarkdownIt();

const ArticleAdd = (props) => {
  const userId = localStorage.getUserId();
  const [warn, setWarn] = useState({
    text: "",
    type: "",
    display: "hide",
  });
  const [category, setCategory] = useState(null);
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const categoriesUpdate = (value) => {
    setCategory(value);
    setWarn({ text: "", type: "", display: "hide" });
  };
  const fileUpdate = (value) => {
    setFile(value);
    setWarn({ text: "", type: "", display: "hide" });
  };
  const editorUpdate = (html, value) => {
    var tmp = html.match("<h1>(.*)</h1>");
    if (tmp !== null) {
      setTitle(tmp[1]);
      var length = tmp[1].length + 2;
      if (length !== null) {
        setContent(value.substr(length));
      }
    }
    setWarn({ text: "", type: "", display: "hide" });
  };
  const add = async (e) => {
    e.preventDefault();
    if (category !== null && !string.isEmpty(preview)) {
      if (!string.isEmpty(title)) {
        try {
          const result = await axios.post("/api/articles/add", {
            userId: userId,
            title: title,
            preview: preview,
            content: content,
            category: category,
            imgPath: file,
          });
          if (result.data.length !== 0) {
            props.history.push(`/profile?id=${userId}`);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        setWarn({
          text: "У статьи нет заголовка!",
          type: "warn",
          display: "show",
        });
      }
    } else {
      setWarn({
        text: "Не все поля были заполнены!",
        type: "warn",
        display: "show",
      });
    }
  };
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
          <Categories update={categoriesUpdate} />
          <div className={classes.preview}>
            <Textarea
              value={preview}
              placeholder="Краткое содержание"
              onChange={(e) => {
                setPreview(e.target.value);
                setWarn({ text: "", type: "", display: "hide" });
              }}
            />
          </div>
          <UploadFile accept=".jpg,.png,.mp4" type="all" update={fileUpdate} />
          <div className={classes.content}>
            <Editor update={editorUpdate} />
          </div>
          <Warning text={warn.text} display={warn.display} type={warn.type} />
          <div className={classes.btn_container}>
            <Button text="Опубликовать" color="blue" onClick={add} />
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(ArticleAdd);
