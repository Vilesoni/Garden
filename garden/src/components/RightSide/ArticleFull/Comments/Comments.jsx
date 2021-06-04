import React, { useState, useEffect } from "react";
import axios from "../../../../axios/config";
import Tooltip from "@material-ui/core/Tooltip";
import classes from "./Comments.module.css";
import Info from "../../Info/Info.jsx";
import Warning from "../../../UI/Warning/Warning.jsx";
import Textarea from "../../../UI/Textarea/Textarea.jsx";
import localStorage from "../../../../localStorage.js";
import string from "../../../../string.js";
import sent from "./sent.png";

const Comments = (props) => {
  const [comments, setComments] = useState([]);
  const [send, setSend] = useState(false);
  const [content, setContent] = useState("");
  const userId = localStorage.getUserId();
  useEffect(() => {
    fetchData();
  }, [send]);
  const fetchData = async () => {
    try {
      const result = await axios.post("/api/comments/get-all", {
        articleId: props.articleId,
      });
      setComments(result.data);
      setSend(false);
    } catch (error) {
      console.error(error.message);
    }
  };
  const Add = async () => {
    try {
      await axios.post("/api/comments/add", {
        content: content,
        articleId: props.articleId,
        userId: userId,
      });
      setSend(true);
      setContent("");
    } catch (error) {
      console.error(error.message);
    }
  };
  const onChange = (e) => {
    setContent(e.target.value);
  };
  return (
    <div className={classes.Comments}>
      {comments.map((item) => (
        <div className={classes.comment_item} key={item.id}>
          <Info
            id={item.userId}
            date={item.createdAt}
            img={item.imgPath}
            userName={item.login}
          />
          <div className={classes.comment_content}>{item.content}</div>
        </div>
      ))}
      <div className={classes.comment_wrapper}>
        {isNaN(userId) ? (
          <Warning
            text="Чтобы оставлять комментарии необходимо авторизоваться."
            display="show"
            type="warn"
          />
        ) : (
          <div className={classes.textarea}>
            <Textarea
              value={content}
              placeholder="Комментарий"
              onChange={onChange}
            />
            <Tooltip arrow title="Отправить">
              <img className={classes.send} src={sent} onClick={Add} />
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};
export default Comments;
