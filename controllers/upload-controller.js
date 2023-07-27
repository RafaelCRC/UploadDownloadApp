const sqlite = require('../sqlite');
const bcrypt = require('bcrypt');

exports.uploadFile = async (req, res, next) => {
    try {
        var hash = null;
        var clientPassword;

        const linkToHash = req.file.originalname + process.env.SECRET;
        var fileLinkHash = bcrypt.hashSync(linkToHash, 5);
        fileLinkHash = fileLinkHash.replace(/\//g, "x");
        const downloadLink = process.env.URL_API + 'download/link/' + fileLinkHash

        if (req.headers.authorization) {
            clientPassword = req.headers.authorization.split(' ')[1];
        };

        if (clientPassword) {
            hash = await bcrypt.hashSync(clientPassword, 10);
        };
        
        const checkQuery = 'SELECT * FROM files WHERE fileName = ?;';
        const existingFile = await sqlite.execute(checkQuery, [req.file.originalname]);

        if (existingFile.length > 0) {
            const updateQuery = 'UPDATE files SET filePath = ?, fileLinkHash = ?, filePassword = ? WHERE fileName = ?;';
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
            const insertQuery = 'INSERT INTO files (fileName, filePath, fileLinkHash, filePassword) VALUES (?,?,?,?);';
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
        console.log(error) // to remove
        return res.status(500).send({ error: error });
    }
};