const { db } = require("../config.js");

const getAll = (req, res, next) => {
  const userId = req.body.userId;
  const articleId = req.body.articleId;
  db.query(
    `call likes (@ifSet, @count, '${userId}', '${articleId}')`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        db.query(`select @ifSet as ifSet, @count as count`, (err, result) => {
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
  getAll,
};
