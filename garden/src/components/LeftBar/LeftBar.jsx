import React, { useState } from "react";
import classes from "./LeftBar.module.css";
import Header from "./Header/Header.jsx";
import Categories from "./Categories/Categories.jsx";
import UsersRating from "./UsersRating/UsersRating.jsx";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import SyncLoader from "react-spinners/SyncLoader";

const LeftBar = () => {
  return (
    <>
      <LazyLoadComponent
        placeholder={
          <div className={classes.loader}>
            <SyncLoader color="#86a573" />
          </div>
        }
      >
        <div className={classes.LeftBar}>
          <Header />
          <Categories />
          <UsersRating />
        </div>
      </LazyLoadComponent>
    </>
  );
};
export default LeftBar;
