const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./book_management.db", (err) => {
  if (err) {
    console.error("Error opening database");
  } else {
    console.log("Database is connected to SQLite");
  }
});

// Export the db instance using CommonJS syntax
module.exports = db;
