const express = require('express');
const jobOfferController = require('../controllers/jobOfferController');

const router = express.Router();

router.get('/view', jobOfferController.showOfferDetails_get);

module.exports = router;