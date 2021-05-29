import React, { useState, useEffect } from "react";
import axios from "../../../axios/config";
import classes from "./Categories.module.css";
import CategoryItem from "./CategoryItem/CategoryItem.jsx";

const Categories = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const result = await axios.get("/api/categories/get-all");
      setCategory(result.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className={classes.Categories}>
      {category.map((item) => (
        <CategoryItem key={item.id} text={item.name} id={item.id} />
      ))}
    </div>
  );
};

export default Categories;
