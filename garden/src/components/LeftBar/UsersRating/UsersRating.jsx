import React, { useState, useEffect } from "react";
import axios from "../../../axios/config";
import classes from "./UsersRating.module.css";
import StatisticItem from "./StatisticItem/StatisticItem.jsx";
const UsersRating = () => {
  const [usersRating, setUsersRating] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const result = await axios.get("/api/users/get-rating");
      setUsersRating(result.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className={classes.UsersRating}>
      {usersRating !== 0
        ? usersRating.map((item) => (
            <StatisticItem
              key={item.id}
              id={item.id}
              login={item.login}
              rating={item.rating}
              imgPath={item.imgPath}
            />
          ))
        : false}
    </div>
  );
};
export default UsersRating;
