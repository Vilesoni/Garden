import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import MarkdownIt from "markdown-it";
import axios from "../../../../axios/config";
import classes from "./ArticleFull.module.css";
import localStorage from "../../../../localStorage";
import Warning from "../../../UI/Warning/Warning";
import Info from "../../Info/Info";
import Button from "../../../UI/Button/Button";
import SyncLoader from "react-spinners/SyncLoader";
const mdParser = new MarkdownIt();

const ArticleFull = (props) => {
  const admin = localStorage.getUserRights();
  const articleId = new URL(window.location.href).searchParams.get("id");
  const [article, setArticle] = useState([]);
  const [imgClass, setImgClass] = useState("articlePic");
  const [loading, setLoading] = useState(false);
  const [warn, setWarn] = useState({ text: "", type: "", display: "hide" });
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/articles/get-by-id-not-approved", {
        articleId: articleId,
      });
      if (result.data.length === 0) {
        setWarn({
          text: "Данной статьи не существует.",
          type: "info",
          display: "show",
        });
      } else {
        setArticle(result.data);
      }
      setLoading(false);
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
          {loading ? (
            <div className={classes.loader}>
              <SyncLoader color="#86a573" />
            </div>
          ) : article.length !== 0 ? (
            article.map((item) => (
              <div key={item.articleId}>
                <p className={classes.title}>{item.title}</p>
                <Info
                  id={item.userId}
                  date={item.createdAt}
                  img={item.imgPathUser}
                  userName={item.login}
                />
                {item.imgPathArticle !== null && (
                  <div className={classes[imgClass]}>
                    {item.imgPathArticle.includes("video") ? (
                      <video
                        className={classes.video}
                        src={item.imgPathArticle}
                        controls="controls"
                      />
                    ) : (
                      <img
                        className={classes.img}
                        src={item.imgPathArticle}
                        alt=""
                        onError={() => setImgClass("none")}
                      />
                    )}
                  </div>
                )}
                <div
                  className={classes.content}
                  dangerouslySetInnerHTML={{
                    __html: mdParser.render(item.content),
                  }}
                />
                <div>
                  <Button
                    text="Подтвердить публикацию"
                    color="green"
                    onClick={approve}
                  />
                </div>
              </div>
            ))
          ) : (
            <Warning text={warn.text} type={warn.type} display={warn.display} />
          )}
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
