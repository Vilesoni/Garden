const { db } = require("../config.js");
const bcrypt = require("bcryptjs");

const getRating = (req, res) => {
  db.query(`select * from users_rating`, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

const getById = (req, res) => {
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
const getByLogin = (req, res) => {
  const login = req.body.login;
  const email = req.body.email;
  db.query(
    `select count(*) as count from users 
  where login='${login}' or email='${email}'`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        if (result[0].count <= 0) {
          res.send("ok");
        } else {
          res.send("exist");
        }
      }
    }
  );
};

const getByIdArticles = (req, res) => {
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

const getByIdArticlesLiked = (req, res) => {
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

const getByApproved = (req, res) => {
  const userId = req.body.userId;
  db.query(
    `select * from user_articles_confirmation 
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

const login = (req, res) => {
  const login = req.body.login;
  const password = req.body.password;
  db.query(
    `select count(*) as count from users 
  where login='${login}'`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        if (result[0].count > 0) {
          db.query(
            `select password from users where login='${login}'`,
            (err, result) => {
              if (err) {
                res.send(err);
              } else {
                const verified = bcrypt.compareSync(
                  password,
                  result[0].password
                );
                if (verified) {
                  db.query(
                    `select * from users where login='${login}'`,
                    (err, result) => {
                      if (err) {
                        res.send(err);
                      } else {
                        res.send({ action: "ok", data: result[0] });
                      }
                    }
                  );
                } else {
                  res.send("none");
                }
              }
            }
          );
        } else {
          res.send("none");
        }
      }
    }
  );
};
const addUser = (req, res) => {
  const login = req.body.login;
  const email = req.body.email;
  const password = req.body.password;
  const code = req.body.code;
  db.query(
    `select count(*) as count from user_confirm 
    where login='${login}' and confirmCode='${code}'`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        if (result[0].count > 0) {
          db.query(
            `insert into users(login, email, password)
        values('${login}', '${email}', '${password}')`,
            (err) => {
              if (err) {
                res.send(err);
              } else {
                db.query(
                  `select * from users where login='${login}'`,
                  (err, result) => {
                    if (err) {
                      res.send(err);
                    } else {
                      db.query(
                        `delete from user_confirm where login='${login}'
                      and code='${code}'`,
                        (err) => {
                          if (err) {
                            res.send(err);
                          }
                        }
                      );
                      res.send({ action: "ok", data: result[0] });
                    }
                  }
                );
              }
            }
          );
        } else {
          res.send("error");
        }
      }
    }
  );
};

const edit = (req, res, next) => {
  const userId = req.body.userId;
  const login = req.body.login;
  const fullName = req.body.fullName;
  const imgPath = req.body.imgPath;
  var exist;
  var sameUser;
  db.query(
    `select count(*) as count from users where login='${login}'`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        exist = result[0].count;
        db.query(
          `select count(*) as sameUser from users 
        where login='${login}' and id='${userId}'`,
          (err, result) => {
            if (err) {
              res.send(err);
            } else {
              sameUser = result[0].sameUser;
              if (exist > 1 || sameUser == 1) {
                db.query(
                  `update users set login='${login}', 
              fullName='${fullName}', 
              imgPath='${imgPath}' 
              where id='${userId}'`,
                  (err, result) => {
                    if (err) {
                      res.send(err);
                    } else {
                      res.send("edited");
                    }
                  }
                );
              } else {
                res.send("exists");
              }
            }
          }
        );
      }
    }
  );
};

const passwordEdit = (req, res) => {
  const login = req.body.login;
  const password = req.body.password;
  const code = req.body.code;
  const hashPassword = bcrypt.hashSync(password, 5);
  db.query(
    `select * from user_confirm where login='${login}' 
  and confirmCode='${code}'`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        if (result.length !== 0) {
          db.query(
            `update users set password='${hashPassword}'
        where login='${login}'`,
            (err) => {
              if (err) {
                res.send(err);
              } else {
                db.query(
                  `delete from user_confirm where login='${login}'
                  and confirmCode='${code}'`,
                  (err) => {
                    if (err) {
                      res.send(err);
                    }
                  }
                );
                db.query(
                  `select * from users where login='${login}'`,
                  (err, result) => {
                    if (err) {
                      res.send(err);
                    } else {
                      res.send({ action: "edited", data: result[0] });
                    }
                  }
                );
              }
            }
          );
        } else {
          res.send("error");
        }
      }
    }
  );
};

module.exports = {
  getRating,
  login,
  addUser,
  edit,
  getById,
  getByLogin,
  getByIdArticles,
  getByIdArticlesLiked,
  getByApproved,
  passwordEdit,
};
