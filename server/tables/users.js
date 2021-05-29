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
  login
};
