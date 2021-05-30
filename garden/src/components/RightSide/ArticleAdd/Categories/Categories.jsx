import React, { useState, useEffect } from "react";
import axios from "../../../../axios/config";
import classes from "./Categories.module.css";

const Categories = (props) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("Выберите категорию");
  const [style, setStyle] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const result = await axios.get("/api/categories/get-all");
      setCategories(result.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <div className={classes.Categories}>
        {categories.map((item) => (
          <span
            id={item.id}
            active="false"
            key={item.id}
            className={classes.category}
            onClick={(e) => {
              props.update(item.id);
              setCategory(`#${item.name}`);
              setStyle("active");
            }}
          >
            #{item.name}
          </span>
        ))}
      </div>
      <div className={classes.choose}>
        <span className={classes[style]}>{category}</span>
      </div>
    </>
  );
};
export default Categories;
