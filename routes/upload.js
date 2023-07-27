const express = require('express');
const router = express.Router();

const uploadController = require('../controllers/upload-controller');

router.get('/', uploadController.getUpload);
router.post('/', uploadController.uploadFile);

module.exports = router;