const { db } = require("../config.js");

const getAll = (req, res, next) => {
  const articleId = req.body.articleId;
  db.query(
    `select * from comments_view where articleId='${articleId}'`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
};

const add = (req, res, next) => {
  const content = req.body.content;
  const articleId = req.body.articleId;
  const userId = req.body.userId;
  db.query(
    `insert into comments (content, articleId, userId)
    values('${content}','${articleId}','${userId}')`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
};

module.exports = {
  getAll,
  add
};
