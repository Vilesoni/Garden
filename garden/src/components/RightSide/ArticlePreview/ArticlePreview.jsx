import React, { useState, useEffect } from "react";
import axios from "../../../axios/config";
import classes from "./ArticlePreview.module.css";
import ArticleInfo from "./ArticleInfo/ArticleInfo";
import Search from "./Search/Search";
import Calendar from "./Calendar/Calendar";
import SyncLoader from "react-spinners/SyncLoader";

function getURL() {
  switch (window.location.pathname) {
    case "/category":
      return "/api/articles/get-by-category";
    case "/results":
      return "/api/articles/get-by-query";
    default:
      return "/api/articles/get-by-date";
  }
}
function getSearchFromURL() {
  var url = new URL(window.location.href);
  switch (window.location.pathname) {
    case "/category":
      return url.searchParams.get("id");
    case "/results":
      return url.searchParams.get("query");
    default:
      return "";
  }
}
function setWarning() {
  switch (window.location.pathname) {
    case "/category":
      return "В данной категории статей пока нет";
    case "/results":
      return "Поиск не дал результатов";
    default:
      return "Сегодня не было статей";
  }
}
const ArticlePreview = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = getURL();
  useEffect(() => {
    fetchData();
  }, [window.location.href]);
  const fetchData = async () => {
    const searchParams = getSearchFromURL();
    setLoading(true);
    try {
      const result = await axios.post(url, {
        categoryId: searchParams,
        query: searchParams,
      });
      setArticles(result.data);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className={classes.ArticlePreview}>
      <Search />
      <Calendar />
      <div className={classes.title}>
        <p>Статьи</p>
      </div>
      {loading ? (
        <div className={classes.loader}>
          <SyncLoader color="#86a573" />
        </div>
      ) : (
        <div className={classes.previews}>
          {articles.length !== 0 ? (
            articles.map((item) => (
              <ArticleInfo
                key={item.articleId}
                id={item.articleId}
                userId={item.userId}
                title={item.title}
                date={item.createdAt}
                img={item.imgPathUser}
                userName={item.login}
                preview={item.preview}
                category={item.category}
              />
            ))
          ) : (
            <div className={classes.warning}>{setWarning()} &#128542;</div>
          )}
        </div>
      )}
    </div>
  );
};
export default ArticlePreview;
