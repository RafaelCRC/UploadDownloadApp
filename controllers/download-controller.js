exports.getDownload = async (req, res, next) => {
    res.status(200).send({
        message: 'get method for testing download route and controller'
    });
}