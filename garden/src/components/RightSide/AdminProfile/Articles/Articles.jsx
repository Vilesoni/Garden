import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../../../axios/config";
import classes from "./Articles.module.css";

const Articles = (props) => {
  const [url, setUrl] = useState("/api/articles/get-by-date-not-apporved");
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetchData();
  }, [url]);
  const fetchData = async () => {
    try {
      const result = await axios.get(url);
      setArticles(result.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={classes.Articles}>
      <div className={classes.time}>
        <span
          className={classes.timeItem}
          onClick={() => {
            setUrl("/api/articles/get-by-date-not-apporved");
          }}
        >
          Сегодня
        </span>
        <span
          className={classes.timeItem}
          onClick={() => {
            setUrl("/api/articles/get-all-not-approved");
          }}
        >
          Все время
        </span>
      </div>
      <div className={classes.articles}>
        {articles.length !== 0 ? (
          articles.map((item, index) => (
            <div key={index} className={classes.article}>
              <span>
                <Link to={`/no-approved/article?id=${item.articleId}`}>
                  <span className={classes.title}>{item.title}</span>
                </Link>
              </span>
              <div className={classes.info}>
                <div>{item.createdAt}</div>
                <span className={classes.category}>#{item.category}</span>
              </div>
              <div className={classes.preview}>{item.preview}</div>
            </div>
          ))
        ) : (
          <div className={classes.warning}>Пока нет статей &#128542;</div>
        )}
      </div>
    </div>
  );
};

export default Articles;
