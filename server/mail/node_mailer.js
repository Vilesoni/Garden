const nodemailer = require("nodemailer");
const { db } = require("../config");

const transparter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "garden0help@gmail.com",
    pass: "GardenHelp",
  },
});

const sendLogupMail = (req, res) => {
  const mail = req.body.mail;
  const login = req.body.login;
  const link = req.body.link;
  const confirmCode = new Date().getMilliseconds();
  const mailOptions = {
    from: "garden0help@gmail.com",
    to: mail,
    subject: "Спасибо за регистрацию",
    html: `<h3>${login}, cпаcибо за регистрацию на сайте Сад и огород &#128516;.</h3>
    <p>Код подтверждения: ${confirmCode}.</p></br></br>
    <p>Для подтверждения 
    регистрации перейдите по ссылке: ${link}.</p></br></br>`,
  };
  transparter.sendMail(mailOptions, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      db.query(
        `insert into user_confirm (login, confirmCode)
      values('${login}', '${confirmCode}')`,
        (err) => {
          if (err) {
            res.send(err);
          } else {
            res.send("sended");
          }
        }
      );
    }
  });
};

const passwordReset = (req, res) => {
  const mail = req.body.mail;
  const login = req.body.login;
  // const link = `http://localhost:3000/new-password?login=${login}`;
  const link = `https://agitated-noether-80e9db.netlify.app/new-password?login=${login}`;
  const code = new Date().getMilliseconds();
  db.query(
    `select count(*) as count from users 
    where login='${login}' and email='${mail}'`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        if (result[0].count > 0) {
          const mailOptions = {
            from: "garden0help@gmail.com",
            to: mail,
            subject: "Восстановление пароля",
            html: `<h3>Здравствуйте ${login}.</h3>
            <p>Код для восстановления пароля: ${code}.</p>
            <p>Для восстановления пароля перейдите по ссылке: ${link}.</p>`,
          };
          transparter.sendMail(mailOptions, (err, result) => {
            if (err) {
              res.send(err);
            } else {
              db.query(
                `insert into user_confirm (login, confirmCode)
              values('${login}', '${code}')`,
                (err) => {
                  if (err) {
                    res.send(err);
                  } else {
                    res.send("sended");
                  }
                }
              );
            }
          });
        } else {
          res.send("unexist");
        }
      }
    }
  );
};

module.exports = {
  sendLogupMail,
  passwordReset,
};
