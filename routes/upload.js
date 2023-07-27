const express = require('express');
const router = express.Router();

const fileUploadMid = require('../middleware/file-upload');

const uploadController = require('../controllers/upload-controller');

router.post('/', fileUploadMid.single('file'), uploadController.uploadFile);

module.exports = router;