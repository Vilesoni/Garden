import React, { useState, useEffect, useRef } from "react";
import axios from "../../../axios/config";
import MarkdownIt from "markdown-it";
import classes from "./ArticleFull.module.css";
import Info from "../Info/Info";
import Comments from "./Comments/Comments";
import Likes from "./Likes/Likes";
import print from "./print.png";
import ReactToPrint from "react-to-print";
import { Tooltip } from "@material-ui/core";
import SyncLoader from "react-spinners/SyncLoader";
import Button from "../../UI/Button/Button";
import localStorage from "../../../localStorage";
import Warning from "../../UI/Warning/Warning";
const mdParser = new MarkdownIt();

const ArticleFull = (props) => {
  const [article, setArticle] = useState([]);
  const [imgClass, setImgClass] = useState("articlePic");
  const [loading, setLoading] = useState(false);
  const [warn, setWarn] = useState({ text: "", type: "", display: "hide" });
  const articleId = new URL(window.location.href).searchParams.get("id");
  const articleRef = useRef();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/articles/get-by-id", {
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
      console.error(error.message);
    }
  };
  const deleteArticle = async () => {
    try {
      const result = await axios.post("/api/articles/remove", {
        articleId: articleId,
      });
      if (result.data === "deleted") {
        props.history.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={classes.wrapper}>
      {loading ? (
        <div className={classes.loader}>
          <SyncLoader color="#86a573" />
        </div>
      ) : (
        <>
          {article.length !== 0 ? (
            <>
              <div className={classes.ArticleFull}>
                {article.map((item) => (
                  <div key={item.articleId} ref={articleRef}>
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
                  </div>
                ))}
                <div className={classes.printLikeBlock}>
                  <Likes articleId={articleId} />
                  <ReactToPrint
                    trigger={() => (
                      <div>
                        <Tooltip arrow title="Печать">
                          <img
                            className={classes.print}
                            src={print}
                            alt="Печать"
                          />
                        </Tooltip>
                      </div>
                    )}
                    content={() => articleRef.current}
                  />
                  {localStorage.getUserRights() == 1 && (
                    <Button
                      text="Удалить статью"
                      color="red"
                      onClick={deleteArticle}
                    />
                  )}
                </div>
              </div>
              <Comments articleId={articleId} />
            </>
          ) : (
            <Warning text={warn.text} type={warn.type} display={warn.display} />
          )}
        </>
      )}
    </div>
  );
};

export default ArticleFull;
