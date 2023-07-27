const express = require('express');
const router = express.Router();

const uploadController = require('../controllers/upload-controller');

router.get('/', uploadController.getUpload);

module.exports = router;