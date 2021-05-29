const { db } = require("../config.js");

const getCultures = (req, res, next) => {
  const month = req.body.month;
  db.query(
    `select culture from calendar where month='${month}'`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else [res.send(result)];
    }
  );
};

const getDays = (req, res, next) => {
  const month = req.body.month;
  const culture = req.body.culture;
  db.query(
    `select farobleDays, noFarobleDays from calendar 
    where month='${month}' and culture='${culture}'`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else [res.send(result)];
    }
  );
};

module.exports = {
  getCultures,
  getDays,
};
