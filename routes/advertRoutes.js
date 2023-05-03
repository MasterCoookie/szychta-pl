const express = require('express');
const jobAdvertController = require('../controllers/jobAdvertController');
const applyController = require('../controllers/applyController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/view', jobAdvertController.showAdvert);
router.get('/apply', authMiddleware.require_login ,applyController.showApplyingFormula);
router.post('/apply', applyController.apply_post);

module.exports = router;