import React, { useState, useEffect } from "react";
import styles from "./Calendar.module.css";
import Button from "../../../UI/Button/Button";
import axios from "../../../../axios/config";
import string from "../../../../string";
import Input from "../../../UI/Input/Input";
import Warning from "../../../UI/Warning/Warning";
import Cultures from "./Cultures/Cultures";
const months = [
  {
    id: 1,
    month: "Январь",
  },
  {
    id: 2,
    month: "Февраль",
  },
  {
    id: 3,
    month: "Март",
  },
  {
    id: 4,
    month: "Апрель",
  },
  {
    id: 5,
    month: "Май",
  },
  {
    id: 6,
    month: "Июнь",
  },
  {
    id: 7,
    month: "Июль",
  },
  {
    id: 8,
    month: "Август",
  },
  {
    id: 9,
    month: "Сентябрь",
  },
  {
    id: 10,
    month: "Октябрь",
  },
  {
    id: 11,
    month: "Ноябрь",
  },
  {
    id: 12,
    month: "Декабрь",
  },
];
const Calendar = (props) => {
  const [monthDays, setMonthDays] = useState([]);
  const [days, setDays] = useState([]);
  const [choosenMonth, setChoosenMonth] = useState({ name: "", id: "" });
  const [culture, setCulture] = useState("");
  const [warn, setWarn] = useState({ text: "", type: "", display: "hide" });
  const pushDays = (month) => {
    const dayCount = new Date(new Date().getFullYear(), month, 0).getDate();
    var arr = [];
    for (let i = 1; i <= dayCount; i++) {
      arr.push(i);
      days.push({ day: i, faroble: "none" });
    }
    return arr;
  };
  const setValueDay = (e) => {
    const index = e.target.name;
    days[index].faroble = e.target.value;
  };
  const add = async () => {
    var farobleDays = [];
    var noFarobleDays = [];
    if (!string.isEmpty(culture)) {
      days.forEach((item) => {
        switch (item.faroble) {
          case "faroble":
            farobleDays.push(item.day);
            break;
          case "noFaroble":
            noFarobleDays.push(item.day);
            break;
        }
      });
      try {
        const result = await axios.post("/api/calendar/add", {
          culture: culture,
          month: choosenMonth.id,
          farobleDays: farobleDays.join(","),
          noFarobleDays: noFarobleDays.join(","),
        });
        if (result.data === "added") {
          setWarn({
            text: "Запись добавлена",
            type: "success",
            display: "show",
          });
          setDays([])
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setWarn({
        text: "Поле культура обязательно для заполнения",
        type: "warn",
        display: "show",
      });
    }
  };
  useEffect(() => {
    if (warn.type === "success") {
      const timer = setTimeout(() => {
        setWarn({ text: "", type: "", display: "hide" });
        setChoosenMonth({ name: "", id: "" });
      }, 1700);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [warn]);
  return (
    <div className={styles.Calendar}>
      <div className={styles.months}>
        {months.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setChoosenMonth({ name: item.month, id: item.id });
              setMonthDays(pushDays(item.id));
            }}
          >
            {item.month}
          </div>
        ))}
      </div>
      {choosenMonth.name !== "" && (
        <div className={styles.closeBlock}>
          <span
            className={styles.close}
            onClick={() => setChoosenMonth({ name: "", id: "" })}
          >
            X
          </span>
        </div>
      )}
      <div className={styles.month}>{choosenMonth.name}</div>
      {choosenMonth.name !== "" && (
        <div>
          <Cultures month={choosenMonth.id} />
          <div className={styles.inputBlock}>
            <Input
              placeholder="Название культуры"
              maxLength="200"
              onChange={(e) => {
                setCulture(e.target.value);
                setWarn({ text: "", type: "", display: "hide" });
              }}
            />
          </div>
          <div className={styles.head}>
            <div>День</div>
            <div>Значение</div>
          </div>
          <div className={styles.body}>
            {monthDays.map((item) => (
              <div className={styles.rows} key={item}>
                <div className={styles.days}>{item}</div>
                <select
                  className={styles.select}
                  name={item - 1}
                  onChange={setValueDay}
                >
                  <option value="none">-</option>
                  <option value="faroble">Благоприятный</option>
                  <option value="noFaroble">Неблагоприятный</option>
                </select>
              </div>
            ))}
          </div>
          <Warning text={warn.text} type={warn.type} display={warn.display} />
          <div className={styles.btn}>
            <Button text="Сохранить" color="green" onClick={add} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
