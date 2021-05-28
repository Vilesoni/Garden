const mysql = require("mysql");

const db  = mysql.createConnection({
    database: "garden",
    host: "localhost",
    user: "root",
    password: "12345"
})

module.exports = {
    db
}
