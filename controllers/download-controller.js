const sqlite = require('../sqlite');
const bcrypt = require('bcrypt');
const fs = require('fs');

exports.getFiles = async (req, res, next) => {
    try {
        const result = await sqlite.execute('SELECT * FROM files');

        const response = {
            quantity: result.length,
            files: result.map(file => {
                return {
                    fileId: file.fileId,
                    fileName: file.fileName,
                    requirePassword: !!file.filePassword,
                    request: {
                        type: 'GET',
                        description: 'Download the file',
                        url: process.env.URL_API + 'download/' + file.fileName
                    }
                }
            })
        }
        return res.status(200).send(response);
        
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.downloadFile = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM files where filename = ?;';
        const result = await sqlite.execute(query, [req.params.fileName]);

        if (result.length == 0) {
            return res.status(404).send({ message: 'File not found' });
        }

        const file = result[0];

        if (file.filePassword) {
            var clientPassword

            if (req.headers.authorization) {
                clientPassword = req.headers.authorization.split(' ')[1];
            }

            bcrypt.compare(clientPassword, file.filePassword, (err, passwordMatch) => {
                if (err || !passwordMatch) {
                    return res.status(401).send({ message: 'Invalid password' });
                } else {
                    handleFileDownload(file, res)
                }
            });
        } else {
            handleFileDownload(file, res)

        }
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.downloadFileByLink  = async (req, res, next) => {
    try {
        const hashedLink = req.params.hashedLink;
        console.log(hashedLink);
        const query = 'SELECT * FROM files WHERE fileLinkHash = ?;';
        const result = await sqlite.execute(query, [hashedLink]);

        if (result.length === 0) {
            return res.status(404).send({ message: 'Invalid download link' });
        }

        const file = result[0];

        handleFileDownload(file, res)

    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

const handleFileDownload = (file, res) => {
    const filePath = file.filePath;

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send({ message: 'File not found' });
        }

        res.set({
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': `attachment; filename="${file.fileName}"`,
        });

        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
};