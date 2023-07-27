module.exports = {
    INSERT_FILE: 'INSERT INTO files (fileName, filePath, fileLinkHash, filePassword) VALUES (?,?,?,?);',
    UPDATE_FILE: 'UPDATE files SET filePath = ?, fileLinkHash = ?, filePassword = ? WHERE fileName = ?;',
    SELECT_FILE_BY_NAME: 'SELECT * FROM files WHERE fileName = ?;'
};