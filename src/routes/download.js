const express = require('express');
const router = express.Router();

const downloadController = require('../controllers/download-controller');

router.get('/', downloadController.getFiles);
router.get('/link/:hashedLink', downloadController.downloadFileByLink);
router.get('/:fileName', downloadController.downloadFile);

module.exports = router;