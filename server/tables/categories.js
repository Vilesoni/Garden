const { db } = require("../config.js");

const getAll = (req, res, next) => {
  db.query(`select * from categories`, (err, result) => {
    if (err) {
      res.send(err)
    }
    else{
      res.send(result);
    }
  });
};

module.exports = {
    getAll
};
