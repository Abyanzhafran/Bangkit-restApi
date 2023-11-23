const mysql = require("mysql2");

// const db = mysql.createPool({
//   host: process.env.MYSQL_HOST || "localhost",
//   user: process.env.MYSQL_USER || "root",
//   database: process.env.MYSQL_DBNAME || "d-jahit-migrate-production",
//   password: process.env.MYSQL_PASSWORD || "",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// For production ENV
const db = mysql.createPool({
  user: process.env.DB_USER, // e.g. 'my-db-user'
  database: process.env.DB_NAME, // e.g. 'my-database'
  socketPath: process.env.INSTANCE_UNIX_SOCKET,
});

module.exports = db.promise();
