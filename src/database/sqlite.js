const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        throw new Error('Error connecting to database: ' + err.message);
      }
    });

exports.execute = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (error, rows) => {
        if (error) {
            reject(error);
        } else {
            resolve(rows);
        }
        });
    });
};