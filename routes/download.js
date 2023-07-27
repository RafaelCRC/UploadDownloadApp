const express = require('express');
const router = express.Router();

const downloadController = require('../controllers/download-controller');

router.get('/', downloadController.getDownload);

module.exports = router;