const express = require('express');
const profileController = require('../controllers/profileController');
const uploadMiddleware = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/profile', profileController.profile_get);
router.post('/profile', profileController.profile_post);

module.exports = router;