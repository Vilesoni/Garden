import React, { useState } from "react";
import MarkdownIt from "markdown-it";
import { Tooltip } from "@material-ui/core";
import classes from "./Editor.module.css";
const mdParser = new MarkdownIt();

const Editor = (props) => {
  const [text, setText] = useState("");
  return (
    <div className={classes.Editor}>
      <div className={classes.nav}>
        {buttons.map((item) => (
          <Tooltip key={item.text} arrow title={item.toltip}>
            <button
              className={classes.navButton}
              onClick={() => {
                setText(`${text}${item.style}`);
              }}
            >
              {item.text}
            </button>
          </Tooltip>
        ))}
      </div>
      <div className={classes.edit_view}>
        <div className={classes.textarea}>
          <textarea
            rows="10"
            placeholder="Начните писать..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              props.update(
                e.target.value.replace(/\n/g, "   \n"),
                mdParser.render(e.target.value.replace(/\n/g, "   \n")),
                "hide"
              );
            }}
          />
        </div>
        <div
          className={classes.view}
          dangerouslySetInnerHTML={{
            __html: mdParser.render(text.replace(/\n/g, "   \n")),
          }}
        />
      </div>
    </div>
  );
};
const buttons = [
  { text: "𝑰", toltip: "Курсив", style: "*курсив*" },
  { text: "𝐁", toltip: "Полужирный", style: "**полужирный**" },
  { text: "H1", toltip: "Заголовок1", style: "# Заголовок1" },
  { text: "H2", toltip: "Заголовок2", style: "## Заголовок2" },
  { text: "•", toltip: "Маркированный список", style: "* список" },
  { text: "1.", toltip: "Нумерованный список", style: "1. список" },
];

export default Editor;
