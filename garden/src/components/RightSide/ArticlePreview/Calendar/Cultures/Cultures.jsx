import React, { useState, useEffect } from "react";
import axios from "../../../../../axios/config";
import classes from "./Cultures.module.css";
import SyncLoader from "react-spinners/SyncLoader";

const Cultures = (props) => {
  const [cultures, setCultures] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
    setLoading(false);
  }, [props.month]);
  const fetchData = async () => {
    try {
      const result = await axios.post("/api/calendar/get-cultures", {
        month: props.month,
      });
      setCultures(result.data);
      setLoading(true);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className={classes.Cultures}>
      {loading ? (
        cultures.map((item) => (
          <button
            className={classes.culture}
            key={item.culture}
            onClick={() => {
              props.update(item.culture);
            }}
          >
            {item.culture}
          </button>
        ))
      ) : (
        <SyncLoader color="#86a573" size="10"/>
      )}
    </div>
  );
};
export default Cultures;
