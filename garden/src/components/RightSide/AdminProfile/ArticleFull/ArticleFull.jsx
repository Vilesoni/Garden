import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import MarkdownIt from "markdown-it";
import axios from "../../../../axios/config";
import classes from "./ArticleFull.module.css";
import localStorage from "../../../../localStorage";
import Warning from "../../../UI/Warning/Warning";
import Info from "../../Info/Info";
import Button from "../../../UI/Button/Button";
const mdParser = new MarkdownIt();

const ArticleFull = (props) => {
  const admin = localStorage.getUserRights();
  const articleId = new URL(window.location.href).searchParams.get("id");
  const [article, setArticle] = useState([]);
  const [imgClass, setImgClass] = useState("articlePic");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const result = await axios.post("/api/articles/get-by-id-not-approved", {
        articleId: articleId,
      });
      setArticle(result.data);
    } catch (error) {
      console.error(error);
    }
  };
  const approve = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("/api/articles/approve", {
        articleId: articleId,
      });
      if (result.data === "updated") {
        props.history.push(`/admin`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {admin == 1 ? (
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
              {item.imgPathArticle !== null ? (
                <div className={classes[imgClass]}>
                  <img
                    className={classes.img}
                    src={item.imgPathArticle}
                    alt=""
                    onError={() => setImgClass("none")}
                  />
                </div>
              ) : (
                false
              )}
              <div
                className={classes.content}
                dangerouslySetInnerHTML={{
                  __html: mdParser.render(item.content),
                }}
              />
            </div>
          ))}
          <div>
            <Button
              text="Подтвердить публикацию"
              color="green"
              onClick={approve}
            />
          </div>
        </div>
      ) : (
        <Warning
          text="У вас нет доступа к данной странице"
          type="info"
          display="show"
        />
      )}
    </>
  );
};

export default withRouter(ArticleFull);
