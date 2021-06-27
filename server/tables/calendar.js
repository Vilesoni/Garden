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

const add = (req, res, next) => {
  const culture = req.body.culture;
  const month = req.body.month;
  const farobleDays = req.body.farobleDays;
  const noFarobleDays = req.body.noFarobleDays;
  db.query(
    `select count(*) as count 
    from calendar where month='${month}' and culture='${culture}'`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        if (result[0].count > 0) {
          db.query(
            `update calendar 
            set farobleDays='${farobleDays}', noFarobleDays='${noFarobleDays}'
            where month='${month}' and culture='${culture}'`,
            (err) => {
              if (err) {
                res.send(err);
              } else {
                res.send("added");
              }
            }
          );
        } else {
          db.query(
            `insert into calendar (culture, month, farobleDays, noFarobleDays)
          values ('${culture}','${month}','${farobleDays}','${noFarobleDays}')`,
            (err) => {
              if (err) {
                res.send(err);
              } else {
                res.send("added");
              }
            }
          );
        }
      }
    }
  );
};

const remove = (req, res) => {
  const culture = req.body.culture;
  const month = req.body.month;
  db.query(
    `delete from calendar where culture='${culture}' 
    and month='${month}'`,
    (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send("deleted");
      }
    }
  );
};

module.exports = {
  getCultures,
  getDays,
  add,
  remove,
};
