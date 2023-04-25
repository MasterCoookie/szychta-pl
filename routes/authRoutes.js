const express = require('express');
const multer = require('multer');
const authController = require('../controllers/authController');

const upload = multer();

const router = express.Router();

router.put('/register', upload.none(), authController.register_put);
router.get('/register', authController.register_get);
router.get('/login', authController.login_get);
router.post('/login', upload.none(), authController.login_post);
router.get('/logout', authController.logout_get);

module.exports = router;
