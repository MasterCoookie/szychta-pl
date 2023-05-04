const express = require('express');
const jobAdvertController = require('../controllers/jobAdvertController');
const applyController = require('../controllers/applyController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');

const upload = multer();

const router = express.Router();

router.get('/view', jobAdvertController.showAdvert);
router.get('/apply', authMiddleware.require_login , applyController.showApplyingFormula);
router.post('/apply', upload.none() , applyController.apply_post);

module.exports = router;