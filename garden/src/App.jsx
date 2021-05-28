import React, { useState } from "react";
import axios from "./axios/config";

const App = () => {
  const [file, setFile] = useState("");
  const upload = async () => {
    try {
      const data = new FormData();
      data.append("file", file);
      const result = await axios.post("/api/upload-images", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <input
        type="file"
        name="file"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file.size !== 0) {
            setFile(file);
          }
        }}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          upload();
        }}
      >
        Upload
      </button>
    </div>
  );
};
export default App;
