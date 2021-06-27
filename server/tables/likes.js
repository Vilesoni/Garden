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

const getAllLikes = (req, res, next) => {
  const userId = req.body.userId;
  const articleId = req.body.articleId;
  var count;
  var liked = false;
  db.query(
    `select count(*) as count from likes where articleId='${articleId}'`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        count = result[0].count;
        db.query(
          `select count(*) as liked from likes 
          where userId='${userId}' and articleId='${articleId}'`,
          (err, result) => {
            if (err) {
              res.send(err);
            } else {
              if (result[0].liked > 0) {
                liked = true;
              }
              res.send({count: count, liked: liked});
            }
          }
        );
      }
    }
  );
};

const add = (req, res, next) => {
  const userId = req.body.userId;
  const articleId = req.body.articleId;
  db.query(
    `insert into likes (userId, articleId)
    values('${userId}','${articleId}')`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
};

const remove = (req, res, next) => {
  const userId = req.body.userId;
  const articleId = req.body.articleId;
  db.query(
    `delete from likes where userId='${userId}' and articleId='${articleId}'`,
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
  getAll,
  getAllLikes,
  add,
  remove,
};
