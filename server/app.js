const express = require("express");
const cors = require("cors");
const app = express();
const categories = require("./tables/categories");
const users = require("./tables/users");
const articles = require("./tables/articles");
const comments = require("./tables/comments");
const likes = require("./tables/likes");
const calendar = require("./tables/calendar");
const mail = require("./mail/node_mailer");

app.use(cors());
app.use(express.json());

app.get("/api/categories/get-all", categories.getAll);
app.post("/api/categories/remove", categories.remove);
app.post("/api/categories/add", categories.add);

app.get("/api/users/get-rating", users.getRating);
app.post("/api/users/login", users.login);
app.post("/api/users/logup", users.addUser);
app.post("/api/users/edit", users.edit);
app.post("/api/users/get-by-id", users.getById);
app.post("/api/users/get-by-login", users.getByLogin);
app.post("/api/users/get-by-id-articles", users.getByIdArticles);
app.post("/api/users/get-by-id-articles-liked", users.getByIdArticlesLiked);
app.post("/api/users/get-by-approved", users.getByApproved);
app.post("/api/users/password-edit", users.passwordEdit);

app.get("/api/articles/get-all-not-approved", articles.getAllNoApproved);
app.get("/api/articles/get-by-date-not-apporved", articles.getByDateNoApproved);
app.post("/api/articles/get-by-id-not-approved", articles.getByIdNoApproved);
app.post("/api/articles/approve", articles.approve);
app.post("/api/articles/get-by-category", articles.getByCategory);
app.post("/api/articles/get-by-date", articles.getByDate);
app.post("/api/articles/get-by-query", articles.getByQuery);
app.post("/api/articles/get-by-id", articles.getById);
app.post("/api/articles/add", articles.add);
app.post("/api/articles/remove", articles.remove);

app.post("/api/comments/get-all", comments.getAll);
app.post("/api/comments/add", comments.add);

app.post("/api/likes/get-all", likes.getAllLikes);
app.post("/api/likes/add", likes.add);
app.post("/api/likes/remove", likes.remove);

app.post("/api/calendar/get-cultures", calendar.getCultures);
app.post("/api/calendar/get-days", calendar.getDays);
app.post("/api/calendar/add", calendar.add);
app.post("/api/calendar/remove", calendar.remove);

app.post("/api/send-mail-logup", mail.sendLogupMail);
app.post("/api/send-mail-password-reset", mail.passwordReset);

const PORT = 8000;
app.listen(process.env.PORT || PORT, () => {
  console.log(`Running on ${PORT}!`);
});
