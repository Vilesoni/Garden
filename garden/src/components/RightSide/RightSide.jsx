import React from "react";
import { Route } from "react-router";
import classes from "./RightSide.module.css";
import ArticlesPreview from "./ArticlePreview/ArticlePreview";
import ArticleFull from "./ArticleFull/ArticleFull";
// import Login from "./Login/Login.jsx";
// import Logup from "./Logup/Logup.jsx";
// import Profile from "./Profile/Profile.jsx";
// import ProfileEntered from "./ProfileEntered/ProfileEntered.jsx";
// import ArticleAdd from "./ArticleAdd/ArticleAdd.jsx";
// import ProfileEdit from "./ProfileEdit/ProfileEdit.jsx";

function getURLid() {
  let url = new URL(window.location.href);
  return url.searchParams.get("id");
}
const RightSide = () => {
  return (
    <div className={classes.RightSide}>
      <Route
        exact
        path={[`/`, "/category", "/results"]}
        render={() => <ArticlesPreview />}
      />
      <Route exact path={`/article`} render={() => <ArticleFull />} />
      {/* <Route exact path={`/login`} component={Login} />
      <Route exact path={`/logup`} component={Logup} /> */}
      {/* <Route
        exact
        path={`/profile`}
        render={() => <Profile userId={getURLid()} />}
      />
      <Route
        exact
        path={`/profile/user`}
        render={() => <ProfileEntered />}
      />
      <Route exact path={`/article/add`} render={() => <ArticleAdd />} />
      <Route
        exact
        path={`/profile/edit`}
        render={() => <ProfileEdit userId={getURLid()} />}
      /> */}
    </div>
  );
};

export default RightSide;
