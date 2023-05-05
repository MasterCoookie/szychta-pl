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
router.put('/createEmployer', upload.none(), authController.createEmployer_put); //shpuld be move to admin controller when created

module.exports = router;
