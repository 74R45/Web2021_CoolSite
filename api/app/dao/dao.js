const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const dbConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'db', 'config.json')));

class Dao {
  _query(queryString, callback) {
    let connection = mysql.createConnection(dbConfig);
    connection.connect();
    connection.query(queryString, (err, results) => {
      connection.end();
      callback(err, results);
    });
  }
}

module.exports = Dao;