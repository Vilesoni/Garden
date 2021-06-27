import React from "react";
import { Route } from "react-router";
import classes from "./RightSide.module.css";
import ArticlesPreview from "./ArticlePreview/ArticlePreview";
import ArticleFull from "./ArticleFull/ArticleFull";
import Login from "./Login/Login";
import Logup from "./Logup/Logup.jsx";
import Profile from "./Profile/Profile";
import ArticleAdd from "./ArticleAdd/ArticleAdd";
import ProfileEdit from "./ProfileEdit/ProfileEdit";
import AdminProfile from "./AdminProfile/AdminProfile";
import ArticleFullNoApproved from "./AdminProfile/ArticleFull/ArticleFull";
import Recover from "./Recover/Recover";
import setNewPassword from "./SetNewPassword/SetNewPassword";
import Confirm from "./LogupActions/Confirm";

const RightSide = () => {
  return (
    <div className={classes.RightSide}>
      <Route
        exact
        path={[`/`, "/category", "/results"]}
        render={() => <ArticlesPreview />}
      />
      <Route exact path={`/article`} component={ArticleFull} />
      <Route exact path={`/login`} component={Login} />
      <Route exact path={`/logup`} component={Logup} />
      <Route exact path={`/profile`} component={Profile} />
      <Route exact path={`/create/article`} component={ArticleAdd} />
      <Route exact path={`/profile/edit`} render={() => <ProfileEdit />} />
      <Route exact path={`/admin`} component={AdminProfile} />
      <Route
        exact
        path={`/no-approved/article`}
        component={ArticleFullNoApproved}
      />
      <Route exact path={`/recover`} component={Recover} />
      <Route exact path={`/new-password`} component={setNewPassword} />
      <Route exact path={`/confirm/user`} component={Confirm} />
    </div>
  );
};

export default RightSide;
