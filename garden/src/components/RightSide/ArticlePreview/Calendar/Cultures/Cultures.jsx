import React, { useState, useEffect } from "react";
import axios from "../../../../../axios/config";
import classes from "./Cultures.module.css";

const Cultures = (props) => {
  const [cultures, setCultures] = useState([]);
  useEffect(() => {
    fetchData();
  }, [props.month]);
  const fetchData = async () => {
    try {
      const result = await axios.post("/api/calendar/get-cultures", {
        month: props.month,
      });
      setCultures(result.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className={classes.Cultures}>
      {cultures.map((item) => (
        <button className={classes.culture} key={item.culture} onClick={() => {
          props.update(item.culture);
        }}>
          {item.culture}
        </button>
      ))}
    </div>
  );
};
export default Cultures;
