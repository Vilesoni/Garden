import React, { useState } from "react";
import axios from "../../axios/config";
import classes from "./UploadFiles.module.css";
const UploadFiles = (props) => {
  const [fileName, setFileName] = useState(null);
  const [filePath, setFilePath] = useState(null);
  const checkFile = (file) => {
    const extensions = ["image/jpeg", "image/png", "video/mp4"];
    if (extensions.includes(file.type.toString())) {
      return true;
    }
    return false;
  };
  const remove = () => {
    if (fileName !== null) {
      try {
        axios.post("/api/delete-images", {
          fileName: fileName,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  const upload = async (file) => {
    if (file !== null && checkFile(file)) {
      try {
        remove();
        const data = new FormData();
        data.append("file", file);
        await axios
          .post("/api/upload-images", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            props.update(response.data);
            setFileName(response.data);
          });
      } catch (error) {
        console.error(error.message);
      }
    }
  };
  return (
    <div>
      <div className={classes.upload}>
        <label>
          <input
            className={classes.input}
            accept={props.accept}
            type="file"
            name="file"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setFilePath(URL.createObjectURL(file));
                upload(file);
              }
            }}
          />
          <span>Выберите файл</span>
        </label>
      </div>
      {filePath !== null ? (
        <div className={classes.preview}>
          <img className={classes.previewImg} src={filePath} alt="" />
        </div>
      ) : (
        false
      )}
    </div>
  );
};
export default UploadFiles;
