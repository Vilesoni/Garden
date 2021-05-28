const express = require("express");
const cors = require("cors");
const app = express();
const uploading = require("./uploading/uploading");

app.use(cors());
app.use(express.json());

app.post("/api/upload-images", uploading.upload, uploading.get);

app.listen(3001, () => {
  console.log("Running on 3001!");
});
