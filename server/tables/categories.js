const { db } = require("../config.js");

const getAll = (req, res, next) => {
  db.query(`select * from categories`, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

const remove = (req, res, next) => {
  const catId = req.body.catId;
  db.query(`delete from categories where id='${catId}'`, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send("deleted");
    }
  });
};
const add = (req, res, next) => {
  const name = req.body.name;
  db.query(
    `select count(*) as count from categories where name='${name}'`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        if (result[0].count < 1) {
          db.query(
            `insert into categories (name) 
          values('${name}')`,
            (err, result) => {
              if (err) {
                res.send(err);
              } else {
                res.send("added");
              }
            }
          );
        } else {
          res.send("exists");
        }
      }
    }
  );
};

module.exports = {
  getAll,
  remove,
  add
};
