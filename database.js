const sqlite3 = require('sqlite3').verbose();

function initializeDatabase() {    
    const db = new sqlite3.Database('database.db', (err) => {
        if (err) {
            console.error('Error connecting to database:', err.message);
        } else {
            console.log('Connection to SQLite database successfully established.');
            createTables(db);
            console.log('Connection to SQLite database successfully established.');
        }
    });
};

function createTables(db) {
    db.serialize(() => {
    
        db.run(`DROP TABLE IF EXISTS files`);
  
        db.run(`
        CREATE TABLE files (
            fileId INTEGER PRIMARY KEY AUTOINCREMENT,
            filePath TEXT NOT NULL,
            filePassword TEXT
        )
        `);
    });
};

function createTables(db) {
    db.serialize(() => {
    
        db.run(`DROP TABLE IF EXISTS files`);
  
        db.run(`
        CREATE TABLE files (
            fileId INTEGER PRIMARY KEY AUTOINCREMENT,
            filePath TEXT NOT NULL,
            filePassword TEXT
        )
        `);
    });
};

initializeDatabase()