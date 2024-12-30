const Database = require('better-sqlite3');

const db = new Database('./db_entry/sql/database.db', { verbose: console.log });

db.exec(`CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
    )`);

db.exec(`CREATE TABLE IF NOT EXISTS settings (
    setting_is INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    user_id INTEGER REFERENCES users(user_id),
    set1 DECIMAL,
    set2 DECIMAL,
    set3 DECIMAL
    )`);

module.exports = db;
