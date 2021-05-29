import React, { useState, useEffect } from "react";
import classes from "./Months.module.css";
import january from "../img/january.png";
import february from "../img/february.png";
import march from "../img/march.png";
import april from "../img/april.png";
import may from "../img/may.png";
import june from "../img/june.png";
import july from "../img/july.png";
import august from "../img/august.png";
import september from "../img/september.png";
import october from "../img/october.png";
import november from "../img/november.png";
import december from "../img/december.png";

const Months = (props) => {
  return (
    <div>
      <div className={classes.Months}>
        {months.map((item) => (
          <button
            key={item.id}
            className={classes.month}
            onClick={() => {
              props.update(item.month, item.id);
            }}
          >
            <div className={classes.img}>
              <img src={item.img} />
            </div>
            <div className={classes.monthName}>{item.month}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
const months = [
  {
    id: 1,
    month: "Январь",
    img: january,
  },
  {
    id: 2,
    month: "Февраль",
    img: february,
  },
  {
    id: 3,
    month: "Март",
    img: march,
  },
  {
    id: 4,
    month: "Апрель",
    img: april,
  },
  {
    id: 5,
    month: "Май",
    img: may,
  },
  {
    id: 6,
    month: "Июнь",
    img: june,
  },
  {
    id: 7,
    month: "Июль",
    img: july,
  },
  {
    id: 8,
    month: "Август",
    img: august,
  },
  {
    id: 9,
    month: "Сентябрь",
    img: september,
  },
  {
    id: 10,
    month: "Октябрь",
    img: october,
  },
  {
    id: 11,
    month: "Ноябрь",
    img: november,
  },
  {
    id: 12,
    month: "Декабрь",
    img: december,
  },
];
export default Months;
