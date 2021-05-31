import React, { useState, useEffect } from "react";
import axios from "../../../../axios/config";
import { Link } from "react-router-dom";
import classes from "./Articles.module.css";

const Articles = (props) => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetchData();
  }, [props.userId, props.url]);
  const fetchData = async () => {
    try {
      const result = await axios.post(props.url, {
        userId: props.userId,
      });
      setArticles(result.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className={classes.Articles}>
      {articles.length === 0 ? (
        <div className={classes.warning}>Вам еще ничего не понравилось &#128542;</div>
      ) : (
        false
      )}
      {articles.map((item, index) =>
        item.articleId === null ? (
          <div key={index} className={classes.warning}>
            Пока нет статей &#128542;
          </div>
        ) : (
          <div key={index} className={classes.article}>
            <Link to={`/article?id=${item.articleId}`}>
              <span className={classes.title}>{item.title}</span>
            </Link>
            <div className={classes.info}>
              <div>{item.createdAt}</div>
              <span className={classes.category}>#{item.category}</span>
            </div>
            <div className={classes.preview}>{item.preview}</div>
          </div>
        )
      )}
    </div>
  );
};

export default Articles;
