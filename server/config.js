const mysql = require("mysql");

// const db = mysql.createPool({
//   database: "garden",
//   host: "garden-db.mysql.database.azure.com",
//   user: "garden_user@garden-db",
//   password: "Steopatra79",
// });
const db = mysql.createPool({
  database: "garden",
  host: "localhost",
  user: "root",
  password: "12345",
});
module.exports = {
    db
};
