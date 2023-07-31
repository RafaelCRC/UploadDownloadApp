const mysql = require('mysql2')

var pool = mysql.createPool({
    "connectionLimit": 10000,
    "user": "root", //should be ambient variable
    "password": "root", //should be ambient variable
    "database": "appdb", //should be ambient variable
    "host": "localhost", //should be ambient variable
    "port": "3306"  //should be ambient variable
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
