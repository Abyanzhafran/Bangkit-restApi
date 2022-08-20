const mysql = require("mysql")

// const pool = mysql.createPool({
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   socketPath: process.env.INSTANCE_UNIX_SOCKET
// })

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "d-jahit-dev",
})

module.exports = conn
