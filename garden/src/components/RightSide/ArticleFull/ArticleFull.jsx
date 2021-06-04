import React, { useState, useEffect } from "react";
import axios from "../../../axios/config";
import MarkdownIt from "markdown-it";
import classes from "./ArticleFull.module.css";
import Info from "../Info/Info";
import Comments from "./Comments/Comments";
import Likes from "./Likes/Likes";
const mdParser = new MarkdownIt();

const ArticleFull = () => {
  const [article, setArticle] = useState([]);
  const [imgClass, setImgClass] = useState("articlePic");
  const articleId = new URL(window.location.href).searchParams.get("id");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const result = await axios.post("/api/articles/get-by-id", {
        articleId: articleId,
      });
      setArticle(result.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.ArticleFull}>
        {article.map((item) => (
          <div key={item.articleId}>
            <p className={classes.title}>{item.title}</p>
            <Info
              id={item.userId}
              date={item.createdAt}
              img={item.imgPathUser}
              userName={item.login}
            />
            <div className={classes[imgClass]}>
              {item.imgPathArticle != null ? (
                <img
                  className={classes.img}
                  src={`/images/${item.imgPathArticle}`}
                  alt=""
                  onError={() => setImgClass("none")}
                />
              ) : (
                false
              )}
            </div>
            <div
              className={classes.content}
              dangerouslySetInnerHTML={{
                __html: mdParser.render(item.content),
              }}
            />
          </div>
        ))}
        <Likes articleId={articleId} />
      </div>
      <Comments articleId={articleId} />
    </div>
  );
};

export default ArticleFull;
