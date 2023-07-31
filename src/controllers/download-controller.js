const db = require('../database/mysql');
const bcrypt = require('bcrypt');
const fs = require('fs');
const SQL_QUERIES = require('../config/sql-queries');

exports.getFiles = async (req, res, next) => {
    try {
        const result = await db.execute(SQL_QUERIES.SELECT_ALL_FILES);

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
        console.error(error);
        return res.status(500).send({ error: 'Internal server error' });
    }
};

exports.downloadFile = async (req, res, next) => {
    try {
        const query = SQL_QUERIES.SELECT_FILE_BY_NAME;
        const result = await db.execute(query, [req.params.fileName]);

        if (result.length === 0) {
            return res.status(404).send({ message: 'File not found' });
        }

        const file = result[0];

        if (file.filePassword) {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                return res.status(401).send({ message: 'Authorization header missing' });
            }
            const [, clientPassword] = authorizationHeader.split(' ');
            if (!clientPassword) {
                return res.status(401).send({ message: 'Password missing in the authorization header' });
            }
            try {
                const passMatch = await bcrypt.compare(clientPassword, file.filePassword);

                if (!passMatch) {
                    return res.status(401).send({ message: 'Invalid password' });
                }
            } catch (error) {
                return res.status(500).send({ error: 'Error comparing passwords' });
            }
        }

        handleFileDownload(file, res)

    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal server error' });
    }
};

exports.downloadFileByLink  = async (req, res, next) => {
    try {
        const hashedLink = req.params.hashedLink;
        console.log(hashedLink);
        const query = SQL_QUERIES.SELECT_FILE_BY_HASH;
        const result = await db.execute(query, [hashedLink]);

        if (result.length === 0) {
            return res.status(404).send({ message: 'Invalid download link' });
        }

        const file = result[0];

        handleFileDownload(file, res)

    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal server error' });
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