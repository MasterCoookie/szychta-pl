const express = require('express');
const jobOfferController = require('../controllers/jobOfferController');
const stageController = require('../controllers/stageController.js');
const employerController = require('../controllers/employerController');
const applicationController = require('../controllers/applicationController');
//const uploadMiddleware = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');

const router = express.Router();
const upload = multer();

//job offer related routes
router.get('/show_offers', jobOfferController.showOffers_get);
router.get('/manage_offer', authMiddleware.require_secretary, jobOfferController.manageOffer_get);
router.put('/add_offer', [authMiddleware.require_secretary, upload.none()], jobOfferController.addOffer_put);
router.post('/modify_offer', [authMiddleware.require_secretary, upload.none()], jobOfferController.modifyOffer_post);
router.delete('/delete_offer', [authMiddleware.require_secretary, upload.none()], jobOfferController.offer_delete);

//application related routes
router.get('/show_applications', authMiddleware.require_login ,applicationController.applicationsView_get);
router.get('/show_application', authMiddleware.require_login ,applicationController.applicationView_get);

//stage related routes
router.get('/manage_stage', authMiddleware.require_secretary, stageController.manageStage_get);
router.post('/add_stage', [authMiddleware.require_secretary, upload.none()], stageController.addStage_post);
router.post('/modify_stage', [authMiddleware.require_secretary, upload.none()], stageController.modifyStage_post);

//employer related routes
router.get('/employerPanel', authMiddleware.require_secretary, employerController.panel_get);

//todo in next sprint

module.exports = router;
