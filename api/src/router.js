/* eslint-disable require-jsdoc */
const express = require('express');
const multer = require('multer');

const router = express.Router();
const storage = multer.diskStorage({
  destination: 'api/uploads/',
  filename,
});
const upload = multer({
  fileFilter: fileFilter(),
  storage: storage,
});

function filename(req, file, callback) {
  callback(null, file.originalname);
}

function fileFilter(req, file, callback) {
  if (file.mimetype !== 'image/png') {
    req.fileValidationError = 'Wrong file type';
    callback(null, false, req.fileValidationError);
  } else {
    callback(null, true);
  }
}

router.post('/upload', upload.single('photo'), (req, res) => {
  if (req.fileValidationError) {
    res.status(400).json({error: req.fileValidationError});
  } else {
    res.status(201).json({success: true});
  }
});

module.exports = router;
