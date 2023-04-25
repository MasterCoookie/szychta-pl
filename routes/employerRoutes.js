const express = require('express');
const jobOfferController = require('../controllers/jobOfferController');

const router = express.Router();


// job offer related routes
router.get('/employer/show_offers', jobOfferController.showOffers_get);
router.get('/employer/add_offer', jobOfferController.addOffer_get);
router.post('/employer/add_offer', upload.none(), jobOfferController.addOffer_put);
router.get('/employer/modify_offer', jobOfferController.modifyOffer_get);
router.post('/employer/modify_offer', upload.none(), jobOfferController.modifyOffer_post);
router.delete('/employer/delete_offer', upload.none(), jobOfferController.offer_delete);
//application related routes

//todo in next sprint


module.exports = router;
