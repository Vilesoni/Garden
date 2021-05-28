import React, { useState, useEffect } from "react";
import axios from "../../../axios/config";
import { Link } from "react-router-dom";
import classes from "./Categories.module.css";
import CategoryItem from "./CategoryItem/CategoryItem.jsx";

const Categories = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const result = await axios.get(
        "/api/categories/get-all"
      );
      setCategory(result.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className={classes.Categories}>
      {category.map((item) => (
        <Link key={item.id} to={`/category?id=${item.id}`}>
          <CategoryItem text={item.name} />
        </Link>
      ))}
    </div>
  );
};

export default Categories;
