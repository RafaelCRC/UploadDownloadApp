const sqlite = require('../sqlite/sqlite');
const bcrypt = require('bcrypt');
const SQL_QUERIES = require('../config/sql-queries');

const getDownloadLinkHash = async (fileName) => {
    const linkToHash = fileName + process.env.SECRET;
    let fileLinkHash = await bcrypt.hashSync(linkToHash, 5);
    fileLinkHash = fileLinkHash.replace(/\//g, "x");
    return fileLinkHash;
};

const checkIfFileExists = async (fileName) => {
    const checkQuery = SQL_QUERIES.SELECT_FILE_BY_NAME;
    const existingFile = await sqlite.execute(checkQuery, [fileName]);
    return existingFile.length > 0;
};

exports.uploadFile = async (req, res, next) => {
    try {
        var hash = null;
        var clientPassword;

        if (req.headers.authorization) {
            clientPassword = req.headers.authorization.split(' ')[1];
        };

        if (clientPassword) {
            hash = await bcrypt.hashSync(clientPassword, 10);
        };

        const fileName = req.file.originalname;
        if (!fileName || typeof fileName !== 'string') {
            return res.status(400).send({ error: 'Invalid file name' });
        }

        const fileLinkHash = await getDownloadLinkHash(fileName);
        const downloadLink = process.env.URL_API + 'download/link/' + fileLinkHash;

        const fileExists = await checkIfFileExists(fileName);

        if (fileExists) {
            const updateQuery = SQL_QUERIES.UPDATE_FILE;
            await sqlite.execute(updateQuery, [req.file.path, fileLinkHash, hash, req.file.originalname]);

            const response = {
                message: 'Warning: The file with the same name has been replaced.',
                link: downloadLink,
                fileUploaded: {
                    fileName: req.file.originalname,
                    filePath: req.file.path,
                    replaced: true,
                },
            };
            return res.status(201).send(response);

        } else {
            const insertQuery = SQL_QUERIES.INSERT_FILE;
            await sqlite.execute(insertQuery, [req.file.originalname, req.file.path, fileLinkHash, hash]);

            const response = {
                message: 'File uploaded successfully',
                link: downloadLink,
                fileUploaded: {
                    fileName: req.file.originalname,
                    filePath: req.file.path,
                    replaced: false,
                },
            };
            return res.status(201).send(response);
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal server error' });
    }
};