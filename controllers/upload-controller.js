exports.getUpload = async (req, res, next) => {
    res.status(200).send({
        message: 'get method for testing upload route and controller'
    });
}