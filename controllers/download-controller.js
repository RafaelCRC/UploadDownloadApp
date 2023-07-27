const sqlite = require('../sqlite');

exports.getFiles = async (req, res, next) => {
    try {
        const result = await sqlite.execute('SELECT * FROM files');

        const response = {
            quantity: result.length,
            files: result.map(file => {
                return {
                    fileId: file.fileId,
                    fileName: file.fileName,
                    filePath: file.filePath,
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

            if (clientPassword === file.filePassword) { //later will be hashed with bcrypt
                const response = {
                    file: {
                        fileId: file.fileId,
                        fileName: file.fileName,
                        filePath: file.filePath,
                        request: {
                            type: 'GET',
                            description: 'Return all files',
                            url: process.env.URL_API + 'download'
                        }
                    }
                }
                return res.status(200).send(response);

            } else {
                return res.status(401).send({ message: 'Invalid password' });
            }
        } else {
            const response = {
                file: {
                    fileId: file.fileId,
                    fileName: file.fileName,
                    filePath: file.filePath,
                    request: {
                        type: 'GET',
                        description: 'Return all files',
                        url: process.env.URL_API + 'download'
                    }
                }
            }
            return res.status(201).send(response);
        }

        //download logic needed
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error });
    }
};