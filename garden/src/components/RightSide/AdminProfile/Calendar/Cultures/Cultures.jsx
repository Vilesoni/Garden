import React, { useState, useEffect } from "react";
import { Tooltip } from "@material-ui/core";
import styles from "./Cultures.module.css";
import axios from "../../../../../axios/config";

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
      console.error(error);
    }
  };
  const deleteCulture = async (e) => {
    const culture = e.target.id;
    try {
      const result = await axios.post("/api/calendar/remove", {
        month: props.month,
        culture: culture,
      });
      if (result.data === "deleted") {
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.Cultures}>
      {cultures.length !== 0 && (
        <>
          <div className={styles.title}>Культуры</div>
          <div className={styles.culture}>
            {cultures.map((item) => (
              <div key={item.culture}>
                <span className={styles.cultureItem}>{item.culture}</span>
                <Tooltip arrow title="Удалить">
                  <span
                    id={item.culture}
                    className={styles.close}
                    onClick={deleteCulture}
                  >
                    x
                  </span>
                </Tooltip>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Cultures;
