import React from "react";
import { withRouter, Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import exit from "./exit.png";
import classes from "./AdminProfile.module.css";
import localStorage from "../../../localStorage";
import Warning from "../../UI/Warning/Warning";
import CategoriesActions from "./Categories/CategoriesActions";
import Calendar from "./Calendar/Calendar";
import Articles from "./Articles/Articles";
import Pic from "../../UI/Pic/Pic";

const AdminProfile = (props) => {
  const admin = localStorage.getUserRights();
  const login = localStorage.getUserLogin();
  return (
    <div className={classes.AdminProfile}>
      {admin == 1 ? (
        <>
          <div className={classes.adminBlock}>
            <div className={classes.imgBlock}>
              <Pic size="huge" src="" />
              <div className={classes.login}>{login}</div>
            </div>
            <span>
              <Link to="/">
                <Tooltip title="Выйти" arrow>
                  <img
                    className={classes.img}
                    src={exit}
                    onClick={() => {
                      localStorage.deleteUser("user");
                    }}
                  />
                </Tooltip>
              </Link>
            </span>
          </div>
          <div className={classes.blocks}>
            <div className={classes.categories}>
              <div className={classes.blockTitle}>Категории</div>
              <CategoriesActions />
            </div>
            <div className={classes.categories}>
              <div className={classes.blockTitle}>Календарь</div>
              <Calendar />
            </div>
            <div className={classes.categories}>
              <div className={classes.blockTitle}>Статьи</div>
              <Articles />
            </div>
          </div>
        </>
      ) : (
        <Warning
          text="У вас нет доступа к данной странице"
          type="info"
          display="show"
        />
      )}
      <div className={classes.nav}></div>
    </div>
  );
};

export default withRouter(AdminProfile);
