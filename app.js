const express = require('express');
const app = express();

const uploadRoute = require('./routes/upload');
const downloadRoute = require('./routes/download');

app.use('/upload', uploadRoute);
app.use('/download', downloadRoute);

module.exports = app;