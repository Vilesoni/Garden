import React, { useState, useEffect, useMemo } from "react";
import classes from "./Calendar.module.css";
import Months from "./Months/Months.jsx";
import CalendarItem from "./CalendarItem/CalendarItem.jsx";
import Cultures from "./Cultures/Cultures.jsx";

const Calendar = (props) => {
  const [monthName, setMonthName] = useState("");
  const [monthCount, setMonthCount] = useState(0);
  const [close, setClose] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [culture, setCulture] = useState("");
  function MonthsUpdate(name, count) {
    setMonthName(name);
    setMonthCount(count);
    setClose("X");
    setShowCalendar(true);
    setCulture("");
  }
  function CulturesUpdate(value) {
    setCulture(value);
  }
  return (
    <div className={classes.Calendar}>
      <Months update={MonthsUpdate} />
      <div className={classes.closeContainer}>
        <span
          className={classes.close}
          onClick={() => {
            setMonthName("");
            setMonthCount(0);
            setCulture("");
            setClose("");
            setShowCalendar(false);
          }}
        >
          {close}
        </span>
      </div>
      <div className={classes.month}>{monthName}</div>
      {showCalendar ? (
        <div>
          <Cultures month={monthCount} update={CulturesUpdate} />
          <CalendarItem monthCount={monthCount} culture={culture} />
        </div>
      ) : (
        false
      )}
    </div>
  );
};
export default Calendar;
