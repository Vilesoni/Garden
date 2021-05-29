import React, { useState, useEffect } from "react";
import axios from "../../../../../axios/config";
import classes from "./CalendarItem.module.css";

const CalendarItem = (props) => {
  const year = new Date().getFullYear();
  const [calendar, setCalendar] = useState([]);
  useEffect(() => {
    fetchData();
  }, [props.monthCount, props.culture]);
  const fetchData = async () => {
    var faroble = [];
    var noFaroble = [];
    if (props.culture !== "") {
      try {
        const result = await axios.post("/api/calendar/get-days", {
          month: props.monthCount,
          culture: props.culture,
        });
        faroble = SetArrays(result.data[0].farobleDays.split("-"));
        noFaroble = result.data[0].noFarobleDays.split(",");
      } catch (error) {
        console.error(error.message);
      }
    }
    setCalendar(getMonth(props.monthCount, year, faroble, noFaroble));
  };
  function SetArrays(arr){
    var newArr = []
    for (let i = parseInt(arr[0]); i <= arr[1]; i++) {
      newArr.push(i);
    }
    return newArr;
  }
  return (
    <div className={classes.CalendarItem}>
      <div className={classes.calendar}>
        <div>
          <table className={classes.calendarTable}>
            <thead>
              <tr className={classes.head}>
                {week.map((item) => (
                  <td key={item.weekDay} className={classes[item.style]}>
                    {item.weekDay}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {calendar.map((item, index) => (
                <tr key={index}>
                  {item.map((item, index) => (
                    <td className={`${classes[item.style]} 
                    ${classes[item.farobleStyle]}
                    ${classes[item.noFarobleStyle]}`} key={index}>
                      {item.day}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <table className={classes.descriptionTable}>
            <tbody>
              <tr>
                <td className={classes.color_good}>•</td>
                <td>Благоприятые</td>
              </tr>
              <tr>
                <td className={classes.color_bad}>•</td>
                <td>Неблагоприятные</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
function setWeekDays(month, year) {
  const dayCount = new Date(year, month, 0).getDate();
  var weekDays = [];
  for (let i = 1; i <= dayCount; i++) {
    weekDays.push(new Date(year, month - 1, i).getUTCDay());
  }
  return weekDays;
}
function getMonth(month, year, farobleDays, noFarobleDays) {
  const daysWeekMonth = setWeekDays(month, year);
  const today = new Date().toDateString();
  var week = ["", "", "", "", "", ""];
  var weekDays = [];
  var currDay = 1;
  var index = 0;
  var style = "origin";
  var frbl = "origin";
  var noFrbl = "origin";
  while (currDay <= new Date(year, month, 0).getDate()) {
    for (let j = 0; j < 7; j++) {
      if (daysWeekMonth[index] === j) {
        style =
          new Date(year, month - 1, currDay).toDateString() === today
            ? "current"
            : "origin";
        frbl =
          farobleDays.includes(currDay)
            ? "faroble"
            : "origin";
        noFrbl = noFarobleDays.includes(currDay.toString())
          ? "nofaroble"
          : "origin";
        week[j] = {
          day: currDay,
          style: style,
          farobleStyle: frbl,
          noFarobleStyle: noFrbl
        };
        currDay++;
        index++;
      }
    }
    weekDays.push(week);
    var week = ["", "", "", "", "", ""];
  }
  return weekDays;
}
const week = [
  {
    weekDay: "ПН",
    style: "simple",
  },
  {
    weekDay: "ВТ",
    style: "simple",
  },
  {
    weekDay: "СР",
    style: "simple",
  },
  {
    weekDay: "ЧТ",
    style: "simple",
  },
  {
    weekDay: "ПТ",
    style: "simple",
  },
  {
    weekDay: "СБ",
    style: "weekend",
  },
  {
    weekDay: "ВС",
    style: "weekend",
  },
];
export default CalendarItem;
