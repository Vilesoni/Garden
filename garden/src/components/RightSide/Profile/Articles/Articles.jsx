import React, { useState, useEffect } from "react";
import axios from "../../../../axios/config";
import { Link } from "react-router-dom";
import classes from "./Articles.module.css";
import SyncLoader from "react-spinners/SyncLoader";

const Articles = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, [props.userId, props.url]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await axios.post(props.url, {
        userId: props.userId,
      });
      setLoading(false);
      setArticles(result.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className={classes.Articles}>
      {loading ? (
        <div className={classes.loader}>
          <SyncLoader color="#86a573" />
        </div>
      ) : articles.length !== 0 ? (
        articles.map((item, index) => (
          <div key={index} className={classes.article}>
            {item.approved === 1 ? (
              <span>
                <Link to={`/article?id=${item.articleId}`}>
                  <span className={classes.title}>{item.title}</span>
                </Link>
              </span>
            ) : (
              <span className={classes.no_approved}>{item.title}</span>
            )}
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
  );
};

export default Articles;
