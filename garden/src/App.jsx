import React from "react";
import classes from "./App.module.css";
import LeftBar from "./components/LeftBar/LeftBar";
// import RightSide from "./components/RightSide/RightSide.jsx";

const App = () => {
  return (
    <div className={classes.App}>
      <div className={classes.left}>
        <LeftBar />
      </div>
      <div className={classes.other}>
        {/* <RightSide /> */}
      </div>
    </div>
  );
};

export default App;
