const sqlite3 = require('sqlite3').verbose();

function initializeDatabase() {    
    const db = new sqlite3.Database('database.db', (err) => {
        if (err) {
            console.error('Error connecting to database:', err.message);
        } else {
            console.log('Connection to SQLite database successfully established.');
            checkAndCreateTables(db);
            console.log('Database initialized.');
        }
    });
};

function checkAndCreateTables(db) {
    db.serialize(() => {
        db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='files'`, (err, row) => {
            if (err) {
                console.error('Error checking for existing table:', err.message);
            } else {
                if (!row) {
                    createTables(db);
                } else {
                    console.log('Tables already exist. Skipping creation.');
                }
            }
        });
    });
};

function createTables(db) {
    db.serialize(() => {
        db.run(`
        CREATE TABLE files (
            fileId INTEGER PRIMARY KEY AUTOINCREMENT,
            fileName TEXT NOT NULL UNIQUE,
            filePath TEXT NOT NULL,
            fileLinkHash TEXT NOT NULL UNIQUE,
            filePassword TEXT
        )
        `);
        console.log('Tables created.');
    });
};

initializeDatabase()