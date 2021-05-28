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

module.exports = {
    getRating,
};
