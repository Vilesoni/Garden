const express = require("express");
const cors = require("cors");
const app = express();
const uploading = require("./uploading/uploading");

app.use(cors());
app.use(express.json());

app.post("/api/upload-images", uploading.upload.single("file"), uploading.get);

app.listen(8000, () => {
  console.log("Running on 8000!");
});
