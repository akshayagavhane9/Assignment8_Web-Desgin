const express = require('express');
const router = express.Router();
const User = require('../models/User');

// User creation endpoint
router.post('/create', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const newUser = new User({ fullName, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

const multer = require('multer');

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, and GIF files are allowed'), false);
    }
  }
});

// Image upload endpoint
router.post('/uploadImage', upload.single('image'), (req, res) => {
  try {
    res.status(200).json({ message: 'Image uploaded successfully', filePath: req.file.path });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
