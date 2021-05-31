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

const logup = (req, res, next) => {
  const login = req.body.login;
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    `call logup('${login}','${email}','${password}', @inserted)`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        db.query(`select @inserted as inserted`, (err, result) => {
          if (err) {
            res.send(err);
          } else {
            if (result[0].inserted === 1) {
              db.query(
                `select id, login, imgPath, admin 
                from users where login='${login}'`,
                (err, result) => {
                  if (err) {
                    res.send(err);
                  } else {
                    res.send(result);
                  }
                }
              );
            } else {
              res.send(result);
            }
          }
        });
      }
    }
  );
};

const edit = (req, res, next) => {
  const userId = req.body.userId;
  const login = req.body.login;
  const fullName = req.body.fullName;
  const imgPath = req.body.imgPath;
  db.query(
    `call edit('${userId}','${login}','${fullName}','${imgPath}', @edited)`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        db.query(`select @edited as edited`, (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        });
      }
    }
  );
};

module.exports = {
  getRating,
  login,
  logup,
  edit,
  getById,
  getByIdArticles,
  getByIdArticlesLiked,
};
