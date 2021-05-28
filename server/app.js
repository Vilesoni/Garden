const express = require("express");
const cors = require("cors");
const app = express();
const uploading = require("./uploading/uploading");
const categories = require("./tables/categories");
const users = require("./tables/users");

app.use(cors());
app.use(express.json());

app.get("/api/categories/get-all", categories.getAll);
app.get("/api/users/get-rating", users.getRating);

app.post("/api/upload-images", uploading.upload.single("file"), uploading.get);

app.listen(8000, () => {
  console.log("Running on 8000!");
});
