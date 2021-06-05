import React, { useState, useEffect } from "react";
import axios from "../../axios/config";
import classes from "./UploadFiles.module.css";
import FilePreview from "./FilePreview/FilePreview";
import Button from "../UI/Button/Button";
import Warning from "../UI/Warning/Warning";
import localStorage from "../../localStorage";

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
  const UpdatePreview = () => {
    setFileSelect("upload");
    setFile(null);
    setFileName(null);
    setFilePath(null);
    setFileInfo(null);
  };
  const upload = async (e) => {
    e.preventDefault();
    const input = document.querySelector("#file");
    try {
      const data = new FormData();
      data.append("file", input.files[0]);
      const result = await axios.post("/api/upload-files", data);
      await axios.post("/api/move-files", {
        fileName: result.data,
        folder: props.folder,
        userId: localStorage.getUser()[0],
      });
      if (result.data) {
        setFileName(result.data);
        setWarn({
          text: "Файл успешно загружен!",
          type: "success",
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
    console.log(fileData);
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
    const timer = setTimeout(() => {
      setWarn({ text: "", type: "", display: "hide" });
    }, 1800);
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
      {filePath !== null ? (
        <div>
          <Button text="Загрузить" onClick={upload} />
        </div>
      ) : (
        false
      )}
    </div>
  );
};
export default UploadFiles;
