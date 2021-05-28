import React from "react";
import classes from "./Textarea.module.css";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
const Textarea = (props) => {
  const cls = [classes.textarea];
  return (
    <TextareaAutosize
      value={props.value}
      rowsMin="1"
      rowsMax="10"
      className={cls.join(" ")}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  );
};
export default Textarea;
