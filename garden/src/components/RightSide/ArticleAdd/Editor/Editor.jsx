import React, { useState } from "react";
import MarkdownIt from "markdown-it";
import simpleMDE from "simplemde";
const mdParser = new MarkdownIt();

const Editor = () => {
  return <textarea id="editor" />;
};

export default Editor;
