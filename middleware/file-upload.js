const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        const filePath = `./uploads/${file.originalname}`;
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        cb(null, file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/gzip') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file format. Only .gz files are allowed.'));
    }
}

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

module.exports = upload;