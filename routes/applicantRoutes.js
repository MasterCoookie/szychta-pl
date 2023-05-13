const express = require('express');
const jobOfferController = require('../controllers/jobOfferController');
const applyController = require('../controllers/applyController');
const authMiddleware = require('../middleware/authMiddleware');
const applicationController = require('../controllers/applicationController');
const multer = require('multer');

const upload = multer();

const router = express.Router();

router.get('/view', jobOfferController.showOfferDetails_get);
router.get('/apply', [authMiddleware.require_login, authMiddleware.prevent_employer], applyController.showApplyingForm);
router.post('/apply', [authMiddleware.require_login, upload.none()], applyController.apply_post);
router.get('/show_applications', authMiddleware.require_login , applicationController.show_applicant_applications_get);

module.exports = router;