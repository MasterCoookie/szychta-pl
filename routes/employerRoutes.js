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
router.get('/manage_offer', jobOfferController.manageOffer_get);
router.put('/add_offer', upload.none(), jobOfferController.addOffer_put);
router.post('/modify_offer', upload.none(), jobOfferController.modifyOffer_post);
router.delete('/delete_offer', upload.none(), jobOfferController.offer_delete);

//application related routes
router.get('/show_applications', applicationController.applicationsView_get);

//stage related routes
router.get('/manage_stage', stageController.manageStage_get);
router.post('/add_stage', upload.none(), stageController.addStage_post);
router.post('/modify_stage', upload.none(), stageController.modifyStage_post);

//employer related routes
router.get('/employerPanel',authMiddleware.require_login, employerController.panel_get);

//todo in next sprint

module.exports = router;
