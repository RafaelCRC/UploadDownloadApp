const sqlite = require('../sqlite');

exports.getUpload = async (req, res, next) => {
    res.status(200).send({
        message: 'get method for testing upload route and controller'
    });
}

exports.uploadFile = async (req, res, next) => {
    try {
        const query = 'INSERT INTO files (fileName, filePath, filePassword) VALUES (?,?,?);';
        const result = await sqlite.execute(query, [
            req.body.fileName, 
            req.body.filePath, 
            req.body.filePassword
        ]);

        const response = {
            message: 'File uploaded successfully',
            createdProduct: {
                fileId: result.insertId,
                fileName: req.body.fileName,
                filePath: req.body.filePath
            }
        }
        return res.status(201).send(response);

    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error });
    }
};