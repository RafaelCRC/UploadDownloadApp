const mysql = require('mysql2');
const { exec } = require('child_process');

function initializeDatabase() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL as root user.');

    connection.query(
      'CREATE DATABASE IF NOT EXISTS appdb;',
      (createDbError) => {
        if (createDbError) throw createDbError;
        console.log('Database "appdb" created.');
        
        connection.changeUser({ database: 'appdb' }, (changeUserError) => {
            if (changeUserError) throw changeUserError;

            const createFilesTableQuery = `
              CREATE TABLE IF NOT EXISTS files (
                fileId INTEGER PRIMARY KEY AUTO_INCREMENT,
                fileName VARCHAR(255) NOT NULL UNIQUE,
                filePath VARCHAR(255) NOT NULL,
                fileLinkHash VARCHAR(255) NOT NULL UNIQUE,
                filePassword VARCHAR(255)
              );`;

            connection.query(createFilesTableQuery, (createTableError) => {
                if (createTableError) throw createTableError;
                console.log('Table "files" created.');
            });

            connection.end();
            console.log('Database initialization completed.');
        });
    });
});
}

initializeDatabase();