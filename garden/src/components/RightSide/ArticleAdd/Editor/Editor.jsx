import React, { useRef, useState } from "react";
import MarkdownIt from "markdown-it";
import { Tooltip } from "@material-ui/core";
import classes from "./Editor.module.css";
const mdParser = new MarkdownIt();

const Editor = (props) => {
  const [text, setText] = useState("");
  const [cursorStart, setCursorStart] = useState(null);
  const [cursorEnd, setCursorEnd] = useState(null);
  const editor = useRef(null);
  const setPosition = () => {
    setCursorStart(editor.current.selectionStart);
    setCursorEnd(editor.current.selectionEnd);
  };
  const removePosition = () => {
    setCursorStart(null);
    setCursorEnd(null);
  };
  const bold = () => {
    if (cursorStart !== cursorEnd) {
      const output = [
        text.slice(0, cursorStart),
        "**",
        text.slice(cursorStart, cursorEnd),
        "**",
        text.slice(cursorEnd, text.length),
      ].join("");
      setText(output);
    }
  };
  const italic = () => {
    if (cursorStart !== cursorEnd) {
      const output = [
        text.slice(0, cursorStart),
        "*",
        text.slice(cursorStart, cursorEnd),
        "*",
        text.slice(cursorEnd, text.length),
      ].join("");
      setText(output);
    }
  };
  const header1 = () => {
    if (cursorStart !== cursorEnd) {
      const output = [
        text.slice(0, cursorStart),
        "# ",
        text.slice(cursorStart, cursorEnd),
        text.slice(cursorEnd, text.length),
      ].join("");
      setText(output);
    }
  };
  const header2 = () => {
    if (cursorStart !== cursorEnd) {
      const output = [
        text.slice(0, cursorStart),
        "## ",
        text.slice(cursorStart, cursorEnd),
        text.slice(cursorEnd, text.length),
      ].join("");
      setText(output);
    }
  };
  const ul = () => {
    if (cursorStart !== cursorEnd) {
      const output = [
        text.slice(0, cursorStart),
        "* ",
        text.slice(cursorStart, cursorEnd),
        text.slice(cursorEnd, text.length),
      ].join("");
      setText(output);
    }
  };
  const ol = () => {
    if (cursorStart !== cursorEnd) {
      const output = [
        text.slice(0, cursorStart),
        "1. ",
        text.slice(cursorStart, cursorEnd),
        text.slice(cursorEnd, text.length),
      ].join("");
      setText(output);
    }
  };
  const link = () => {
    if (cursorStart !== cursorEnd) {
      const output = [
        text.slice(0, cursorStart),
        "[ссылка](",
        text.slice(cursorStart, cursorEnd),
        ")",
        text.slice(cursorEnd, text.length),
      ].join("");
      setText(output);
    }
  };
  const qoute = () => {
    if (cursorStart !== cursorEnd) {
      const output = [
        text.slice(0, cursorStart),
        "> ",
        text.slice(cursorStart, cursorEnd),
        text.slice(cursorEnd, text.length),
      ].join("");
      setText(output);
    }
  };
  const buttons = [
    { text: "𝑰", toltip: "Курсив", action: italic },
    { text: "𝐁", toltip: "Полужирный", action: bold },
    { text: "H1", toltip: "Заголовок1", action: header1 },
    { text: "H2", toltip: "Заголовок2", action: header2 },
    { text: "•", toltip: "Маркированный список", action: ul },
    { text: "1.", toltip: "Нумерованный список", action: ol },
    { text: "«»", toltip: "Цитата", action: qoute },
    { text: "∞", toltip: "Ссылка", action: link },
  ];
  return (
    <div className={classes.Editor}>
      <div className={classes.nav}>
        {buttons.map((item) => (
          <Tooltip key={item.text} arrow title={item.toltip}>
            <button
              className={classes.navButton}
              onClick={() => {
                item.action();
                removePosition();
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
            ref={editor}
            rows="10"
            placeholder="Начните писать..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onClick={setPosition}
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
export default Editor;
