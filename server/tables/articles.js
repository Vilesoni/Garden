const { db } = require("../config.js");

const getByCategory = (req, res, next) => {
  const categoryId = req.body.categoryId;
  db.query(
    `select * from articles_view where categoryId='${categoryId}'`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else [res.send(result)];
    }
  );
};

const getByDate = (req, res, next) => {
  db.query(
    `select * from articles_view where 
    date(aCreatedAt) = date(CURRENT_TIMESTAMP)`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else [res.send(result)];
    }
  );
};

const getByQuery = (req, res, next) => {
  const query = req.body.query;
  db.query(
    `select * from articles_view 
    where title like '%${query}%' or preview like '%${query}%'`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else [res.send(result)];
    }
  );
};

const getById = (req, res, next) => {
  const articleId = req.body.articleId;
  db.query(
    `select * from articles_view where articleId='${articleId}'`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else [res.send(result)];
    }
  );
};

const add = (req, res, next) => {
  const userId = req.body.userId;
  const title = req.body.title;
  const preview = req.body.preview;
  const content = req.body.content;
  const category = req.body.category;
  const imgPath = req.body.imgPath;
  db.query(
    `insert into articles (userId, title, preview, content, categoryId, imgPath)
    values('${userId}','${title}','${preview}',
    '${content}','${category}','${imgPath}')`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else [res.send(result)];
    }
  );
};
module.exports = {
  getByCategory,
  getByDate,
  getByQuery,
  getById,
  add
};
