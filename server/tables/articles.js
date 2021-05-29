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

module.exports = {
  getByCategory,
  getByDate,
  getByQuery
};
