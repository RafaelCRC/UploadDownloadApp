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
                        description: 'Downloads a file',
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

        const response = {
            file: {
                fileId: result[0].fileId,
                fileName: result[0].fileName,
                filePath: result[0].filePath,
                request: {
                    type: 'GET',
                    description: 'Return all files',
                    url: process.env.URL_API + 'download'
                }
            }
        }
        //download logic needed
        return res.status(201).send(response);
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error });
    }
};