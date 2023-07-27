const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const uploadController = require('../controllers/upload-controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        const filePath = `./uploads/${file.originalname}`
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (!err) {
                fs.unlinkSync(filePath);
            }
        });
        cb(null, file.originalname);


        //let data = new Date().toISOString().replace(/:/g, '-') + '-';
        //cb(null, data + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/gzip') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file format. Only .gz files are allowed.'));
        //cb(null, false);
    }
}

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post('/', upload.single('file'), uploadController.uploadFile);

module.exports = router;