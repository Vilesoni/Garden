import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "../../../../axios/config";
import classes from "./CategoriesActions.module.css";
import CategoriesList from "./CategoriesList/CategoriesList";
import Button from "../../../UI/Button/Button";
import Input from "../../../UI/Input/Input";
import string from "../../../../string";
import Warning from "../../../UI/Warning/Warning";

const CategoriesActions = (props) => {
  const [categories, setCategories] = useState(null);
  const [deleteShow, setDeleteShow] = useState(false);
  const [addButton, setaAddButton] = useState({
    text: "Добавить категорию",
    show: false,
  });
  const [action, setAction] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [warn, setWarn] = useState({ text: "", type: "", display: "hide" });
  const updateCategories = (value) => {
    setCategories(value);
    setDeleteShow(true);
  };
  const deleteCategory = async (e) => {
    e.preventDefault();
    if (categories !== null) {
      try {
        const result = await axios.post("/api/categories/remove", {
          catId: categories,
        });
        if (result.data === "deleted") {
          setDeleteShow(false);
          setAction("deleted");
        }
      } catch (error) {}
    }
  };
  const addCategory = async () => {
    if (!string.isEmpty(categoryName)) {
      try {
        const result = await axios.post("/api/categories/add", {
          name: categoryName,
        });
        if (result.data === "added") {
          setAction("added");
          setCategoryName("");
          setaAddButton({
            text: "Добавить категорию",
            show: false,
          });
          setDeleteShow(false);
        } else {
          setWarn({
            text: "Такая категория уже существует",
            type: "warn",
            display: "show",
          });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setWarn({
        text: "Поле название категории обязательное для заполнения",
        type: "warn",
        display: "show",
      });
    }
  };
  return (
    <div className={classes.CategoriesActions}>
      <CategoriesList update={updateCategories} action={action} />
      <div className={classes.addBlock}>
        <Button
          text={addButton.text}
          color="green"
          onClick={() => {
            if (addButton.show) {
              addCategory();
            } else {
              setaAddButton({ text: "Сохранить", show: true });
            }
          }}
        />
        {addButton.show && (
          <div className={classes.add}>
            <Input
              placeholder="Название категории"
              onChange={(e) => {
                setCategoryName(e.target.value);
                setWarn({ text: "", type: "", display: "hide" });
              }}
            />
            <span
              onClick={() => {
                setWarn({ text: "", type: "", display: "hide" });
                setaAddButton({ text: "Добавить категорию", show: false });
              }}
            >
              X
            </span>
          </div>
        )}
      </div>
      <div className={classes.deleteBtn}>
        {deleteShow && (
          <Button
            text="Удалить категорию"
            color="red"
            onClick={deleteCategory}
          />
        )}
      </div>
      <Warning text={warn.text} type={warn.type} display={warn.display} />
    </div>
  );
};

export default CategoriesActions;
