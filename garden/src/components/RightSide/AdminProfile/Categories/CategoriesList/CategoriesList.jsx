import React, { useState, useEffect } from "react";
import axios from "../../../../../axios/config";
import classes from "./CategoriesList.module.css";

const CategoriesActions = (props) => {
  const [categories, setCategories] = useState([]);
  const [choosen, setChoosen] = useState("");
  useEffect(() => {
    fetchData();
  }, [props.action]);
  const fetchData = async () => {
    try {
      const result = await axios.get("/api/categories/get-all");
      setCategories(result.data);
      setChoosen("")
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={classes.CategoriesList}>
      <div className={classes.items}>
        {categories.length !== 0 &&
          categories.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                props.update(item.id);
                setChoosen(item.name);
              }}
            >
              #{item.name}
            </div>
          ))}
      </div>
      {choosen !== "" && (
        <div className={classes.choosenCat}>
          <span>#{choosen}</span>
        </div>
      )}
    </div>
  );
};

export default CategoriesActions;
