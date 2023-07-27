const sqlite3 = require('sqlite3').verbose();

function initializeDatabase() {    
    const db = new sqlite3.Database('database.db', (err) => {
        if (err) {
            console.error('Error connecting to database:', err.message);
        } else {
            console.log('Connection to SQLite database successfully established.');
            createTables(db);
            console.log('Database builded.');
        }
    });
};

function createTables(db) {
    db.serialize(() => {
    
        db.run(`DROP TABLE IF EXISTS files`);
  
        db.run(`
        CREATE TABLE files (
            fileId INTEGER PRIMARY KEY AUTOINCREMENT,
            fileName TEXT NOT NULL,
            filePath TEXT NOT NULL,
            filePassword TEXT
        )
        `);
    });
};

initializeDatabase()