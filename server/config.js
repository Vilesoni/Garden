const mysql = require("mysql");

mysql.createConnection({
    database: "garden",
    host: "localhost",
    user: "root",
    password: "12345"
})