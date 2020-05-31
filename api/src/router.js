/* eslint-disable require-jsdoc */
const express = require('express');
const multer = require('multer');
const path = require('path');

const imageProcessor = require('./imageProcessor');

const router = express.Router();
const storage = multer.diskStorage({
  destination: 'api/uploads/',
  filename: filename,
});
const upload = multer({
  fileFilter: fileFilter,
  storage: storage,
});
const photoPath = path.resolve(__dirname, '../../client/photo-viewer.html');

function filename(req, file, callback) {
  callback(null, file.originalname);
}

function fileFilter(req, file, callback) {
  if (file.mimetype !== 'image/png') {
    req.fileValidationError = 'Wrong file type';
    callback(null, false, new Error(req.fileValidationError));
  } else {
    callback(null, true);
  }
}

router.post('/upload', upload.single('photo'), async (req, res) => {
  if (req.fileValidationError) {
    res.status(400).json({error: req.fileValidationError});
  } 

  try {
    await imageProcessor(req.file.filename);
  } catch (err) {

  }
  return res.status(201).json({success: true});
});

router.get('/photo-viewer', (req, res) => {
  res.sendFile(photoPath);
});

module.exports = router;
