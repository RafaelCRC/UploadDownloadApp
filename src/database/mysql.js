const mysql = require('mysql2')

var pool = mysql.createPool({
    "connectionLimit": 10000,
    "user": process.env.MYSQL_USER || "root",
    "password": process.env.MYSQL_PASSWORD || "root",
    "database": process.env.MYSQL_DATABASE || "appdb",
    "host": process.env.MYSQL_HOST || "localhost",
    "port": process.env.MYSQL_PORT || "3306"
});

exports.execute = (query, params=[]) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (error, result, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}