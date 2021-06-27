import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./UploadFiles.module.css";
import FilePreview from "./FilePreview/FilePreview";
import Button from "../UI/Button/Button";
import Warning from "../UI/Warning/Warning";

const UploadFiles = (props) => {
  const [file, setFile] = useState(null);
  const [fileSelect, setFileSelect] = useState("upload");
  const [filePath, setFilePath] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [warn, setWarn] = useState({
    text: "",
    type: "",
    display: "hide",
  });
  const [uploaded, setUploaded] = useState(false);
  const UpdatePreview = () => {
    setFileSelect("upload");
    setFile(null);
    setFileName(null);
    setFilePath(null);
    setFileInfo(null);
    setUploaded(false);
    setWarn({ text: "", type: "", display: "hide" });
  };
  const upload = async (e) => {
    setUploaded(true);
    e.preventDefault();
    const input = document.querySelector("#file");
    try {
      const data = new FormData();
      data.append("file", input.files[0]);
      data.append("upload_preset", "mxaon1qb");
      var urlType;
      switch (props.type) {
        case "image":
          urlType = "image";
          break;
        case "all":
          switch (input.files[0].type.substring(0, file.type.indexOf("/"))) {
            case "image":
              urlType = "image";
              break;
            case "video":
              urlType = "video";
              break;
          }
          break;
      }
      if (
        input.files[0].type.substring(0, file.type.indexOf("/")) === urlType
      ) {
        setWarn({
          text: "Файл загружается...",
          type: "info",
          display: "show",
        });
        const result = await axios.post(
          `https://api.cloudinary.com/v1_1/garden-project/${urlType}/upload`,
          data
        );
        props.update(result.data.url.replace("http", "https"));
        setWarn({
          text: "Файл успешно загружен!",
          type: "success",
          display: "show",
        });
      } else {
        setWarn({
          text: "Неверный формат файла.",
          type: "warn",
          display: "show",
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const onChangeHandler = (e) => {
    e.preventDefault();
    setFileSelect("uploadNone");
    const fileData = e.target.files[0];
    if (fileData !== undefined) {
      setFile(fileData);
      setFilePath(URL.createObjectURL(fileData));
      setFileInfo(
        `${fileData.name} ${(fileData.size / 1024 / 1024).toFixed(2)}MB`
      );
    } else {
      setFileSelect("upload");
    }
  };
  useEffect(() => {
    var timer;
    if (warn.type === "success") {
      timer = setTimeout(() => {
        setWarn({ text: "", type: "", display: "hide" });
      }, 1800);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [warn]);
  return (
    <div className={classes.FileUpload}>
      <div className={classes[fileSelect]}>
        <label>
          <input
            className={classes.input}
            accept={props.accept}
            type="file"
            id="file"
            name="file"
            onChange={onChangeHandler}
          />
          <span>Выберите файл</span>
        </label>
      </div>
      {filePath !== null ? (
        <FilePreview
          update={UpdatePreview}
          filePath={filePath}
          fileExt={file.type.substring(0, file.type.indexOf("/"))}
          fileName={fileName}
          fileInfo={fileInfo}
        />
      ) : (
        false
      )}
      <Warning
        id="warn"
        text={warn.text}
        display={warn.display}
        type={warn.type}
      />
      {filePath !== null && !uploaded && (
        <div className={classes.loader}>
          <Button text="Загрузить" onClick={upload} />
        </div>
      )}
    </div>
  );
};
export default UploadFiles;
