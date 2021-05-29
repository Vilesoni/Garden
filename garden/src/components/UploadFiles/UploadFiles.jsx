import React, { useState } from "react";
import axios from "../../axios/config";
import classes from "./UploadFiles.module.css";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState(null);
  const upload = async (e) => {
    e.preventDefault();
    if (file !== null) {
      try {
        const data = new FormData();
        data.append("file", file);
        await axios
          .post("/api/upload-images", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            setFileName(response.data);
          });
      } catch (error) {
        console.error(error.message);
      }
    }
  };
  return (
    <div>
      <input
        type="file"
        name="file"
        onChange={(e) => {
          const file = e.target.files[0];
          setFilePath(URL.createObjectURL(file));
          setFile(file);
        }}
      />
      <button onClick={upload}>Upload</button>
      <div className={}>
        <img src={filePath} />
      </div>
    </div>
  );
};
export default UploadImage;
