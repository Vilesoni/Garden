const { db } = require("../config.js");

const getRating = (req, res, next) => {
  db.query(`select * from users_rating`, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

const getById = (req, res, next) => {
  const userId = req.body.userId;
  db.query(
    `select * from users 
  where id='${userId}'`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
};

const getByIdArticles = (req, res, next) => {
  const userId = req.body.userId;
  db.query(
    `select * from user_articles_view 
  where userId='${userId}'`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
};

const getByIdArticlesLiked = (req, res, next) => {
  const userId = req.body.userId;
  db.query(
    `select * from user_liked_view 
  where userId='${userId}'`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
};

const login = (req, res, next) => {
  const login = req.body.login;
  const password = req.body.password;
  db.query(
    `select * from users 
  where login='${login}' and password='${password}'`,
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
  getRating,
  login,
  getById,
  getByIdArticles,
  getByIdArticlesLiked
};
