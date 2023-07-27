const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

function populateDatabase() {    
    const db = new sqlite3.Database('database.db', (err) => {
        if (err) {
            console.error('Error connecting to database:', err.message);
        } else {
            console.log('Connection to SQLite database successfully established.');
            populate(db);
            console.log('Database populated.');
        }
    });
};

function populate(db) {
    db.serialize(() => {
        db.run('DELETE FROM files');
        var password = null
        const numRows = 10
        for (let i = 0; i < numRows; i++) {
            if (i % 2 != 0) {
                password = bcrypt.hashSync("senha" + i, 10);
            } else {
                password = null;
            }
            const query = 'INSERT INTO files (fileName, filePath, filePassword) VALUES (?,?,?)';
            const params = ["file" + i, "test", password];

            db.run(query, params);
        }
    });
};

populateDatabase()