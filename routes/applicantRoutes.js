const express = require('express');
const jobOfferController = require('../controllers/jobOfferController');
const applyController = require('../controllers/applyController');
const authMiddleware = require('../middleware/authMiddleware');
const applicationController = require('../controllers/applicationController');
const multer = require('multer');

const upload = multer();

const router = express.Router();

router.get('/view', jobOfferController.showOfferDetails_get);
router.get('/apply', authMiddleware.require_login , applyController.showApplyingForm);
router.post('/apply', upload.none() , applyController.apply_post);
router.get('/show_applications', authMiddleware.require_login , applicationController.show_applicant_applications);

module.exports = router;