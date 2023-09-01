const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const path = require('path');

async function sqliteConnection() {
  console.log(path.resolve(__dirname, '..', 'database.db'));
  const database = await sqlite.open({
    filename: path.resolve(__dirname, '..', 'database.db'),
    driver: sqlite3.Database,
  });

  return database;
}

module.exports = sqliteConnection;
