import React, { useState, useEffect } from "react";
import axios from "../../../../axios/config";
import {Tooltip} from "@material-ui/core";
import classes from "./Likes.module.css";
import localStorage from "../../../../localStorage.js";
import unliked from "./unliked.png";
import liked from "./liked.png";

const Likes = (props) => {
  const [like, setLike] = useState(false);
  const [img, setImg] = useState(unliked);
  const [count, setCount] = useState(0);
  const userId = isNaN(localStorage.getUserId()) ? null : localStorage.getUserId();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const result = await axios.post(
        "/api/likes/get-all",
        {
          articleId: props.articleId,
          userId: userId,
        }
      );
      setCount(result.data[0].count);
      result.data[0].ifSet ? setImg(liked) : setImg(unliked);
      result.data[0].ifSet ? setLike(true) : setLike(false);
    } catch (error) {
      console.error(error.message);
    }
  };
  const AddDeleteLike = async (state) => {
    let action = state ? "add" : "remove";
    try {
      await axios.post(`/api/likes/${action}`, {
        articleId: props.articleId,
        userId: userId,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className={classes.likes}>
      <div className={setClass(userId)}>
        <Tooltip arrow title="Нравится">
          <img
            src={img}
            onClick={() => {
              if (like) {
                setLike(false);
                setImg(unliked);
                setCount(count - 1);
                AddDeleteLike(false);
              } else {
                setLike(true);
                setImg(liked);
                setCount(count + 1);
                AddDeleteLike(true);
              }
            }}
          />
        </Tooltip>
        <p className={classes.likesCount}>{count}</p>
      </div>
    </div>
  );
};
function setClass(userId) {
  let arr = [];
  userId === null
    ? (arr = [classes.like, classes.noAuth])
    : (arr = [classes.like]);
  return arr.join(" ");
}

export default Likes;
