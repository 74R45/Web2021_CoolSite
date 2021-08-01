const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const dbConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));
const dbMigration = fs.readFileSync(path.join(__dirname, 'migration.sql'), {encoding: 'utf-8'});
const tables = ['admin', 'applications', 'trainings', 'unconfirmed'];

function migrate() {
  function callback(err) {
    if (err) {
      console.log('DB connection failed.\n', err, '\nRetrying in 10 seconds...');
      setTimeout(() => migrateIfNeeded(callback), 10000);
    }
  };
  migrateIfNeeded(callback);
}

function migrateIfNeeded(callback) {
  validateSchema((err, valid) => {
    if (err)
      callback(err);
    else if (valid) {
      console.log('DB schema validated!');
      callback();
    } else {
      console.log('DB schema is invalid, performing migrations...');
      doMigrate(err => {
        if (!err) console.log('Migrated successfully!');
        callback(err);
      });
    }
  });
}

// So far it only checks if there are tables with corresponding names without validating table structures
function validateSchema(callback) {
  let config = {...dbConfig};
  config.database = 'information_schema';
  let connection = mysql.createConnection(config);
  connection.query(`SELECT table_name FROM tables WHERE table_schema = '${dbConfig.database}'`, (err, results) => {
    connection.end();
    if (err)
      callback(err, false);
    else {
      const currentTables = JSON.parse(JSON.stringify(results)).map(t => t.TABLE_NAME);
      const valid = tables.every(table => currentTables.includes(table));
      callback(err, valid);
    }
  });
}

function doMigrate(callback) {
  let connection = mysql.createConnection({...dbConfig, multipleStatements: true});
  connection.connect();
  connection.query(dbMigration, (err, _results) => {
    connection.end();
    callback(err);
  });
}

module.exports = migrate;
