const Database = require('better-sqlite3');

const db = new Database('./db_entry/sql/database.db', { verbose: console.log });

db.exec(`CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
    )`);

db.exec(`CREATE TABLE IF NOT EXISTS settings (
    setting_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    setting_name TEXT,
    user_id INTEGER REFERENCES users(user_id),
    d DECIMAL,
    f1 DECIMAL, 
    f2 DECIMAL,
    a1 DECIMAL,
    a2 DECIMAL
    )`);

module.exports = db;
