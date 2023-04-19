const mysql = require('mysql');
const db = mysql.createPool({
  database: 'beststudy',
  host: 'localhost',
  user: 'root',
  password: '123456',
});
module.exports = db;
