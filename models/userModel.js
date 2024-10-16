const db = require("../config/db");

// Create the users table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT)`);

// Export the db instance using CommonJS syntax
module.exports = db;
