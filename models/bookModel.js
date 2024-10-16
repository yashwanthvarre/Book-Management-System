const db = require("../config/db");

// Create the books table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    description TEXT
)`);

module.exports = db;
