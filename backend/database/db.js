const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const dbFile = path.resolve(__dirname, 'data.db');
const schema = path.resolve(__dirname, '../models/init.sql');

const db = new sqlite3.Database(dbFile);

const initSQL = fs.readFileSync(schema, 'utf-8');
db.exec(initSQL, (err) => {
    if (err) console.error("Error al inicializar la base de datos", err);
});

module.exports = db;