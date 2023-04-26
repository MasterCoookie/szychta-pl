const express = require('express');
const jobOfferController = require('../controllers/jobOfferController');
//const uploadMiddleware = require('../middleware/uploadMiddleware');
const multer = require('multer');

const router = express.Router();
const upload = multer();

// job offer related routes
router.get('/show_offers', jobOfferController.showOffers_get);
router.get('/manage_offer', jobOfferController.manageOffer_get);
router.put('/add_offer', upload.none(), jobOfferController.addOffer_put);
router.post('/modify_offer', upload.none(), jobOfferController.modifyOffer_post);
router.delete('/delete_offer', upload.none(), jobOfferController.offer_delete);

//application related routes

//todo in next sprint

module.exports = router;
