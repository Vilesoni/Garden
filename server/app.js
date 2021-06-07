const express = require("express");
const cors = require("cors");
const app = express();
const fileUpload = require("express-fileupload")
const categories = require("./tables/categories");
const users = require("./tables/users");
const articles = require("./tables/articles");
const comments = require("./tables/comments");
const likes = require("./tables/likes");
const calendar = require("./tables/calendar");
const files = require("./uploading/express-uploading");

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.get("/api/categories/get-all", categories.getAll);

app.get("/api/users/get-rating", users.getRating);
app.post("/api/users/login", users.login);
app.post("/api/users/logup", users.logup);
app.post("/api/users/edit", users.edit);
app.post("/api/users/get-by-id", users.getById);
app.post("/api/users/get-by-id-articles", users.getByIdArticles);
app.post("/api/users/get-by-id-articles-liked", users.getByIdArticlesLiked);

app.post("/api/articles/get-by-category", articles.getByCategory);
app.post("/api/articles/get-by-date", articles.getByDate);
app.post("/api/articles/get-by-query", articles.getByQuery);
app.post("/api/articles/get-by-id", articles.getById);
app.post("/api/articles/add", articles.add);

app.post("/api/comments/get-all", comments.getAll);
app.post("/api/comments/add", comments.add);

app.post("/api/likes/get-all", likes.getAll);
app.post("/api/likes/add", likes.add);
app.post("/api/likes/remove", likes.remove);

app.post("/api/calendar/get-cultures", calendar.getCultures);
app.post("/api/calendar/get-days", calendar.getDays);


app.post("/api/delete-files", files.removeFile);
app.post("/api/upload-files", files.saveFile);
app.post("/api/move-files", files.moveFile);

 
app.listen(process.env.PORT || PORT, () => {
  console.log(`Running on ${PORT}!`);
});
