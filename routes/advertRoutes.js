const express = require('express');
const jobAdvertController = require('../controllers/jobAdvertController');

const router = express.Router();

router.get('/view', jobAdvertController.showAdvert);

module.exports = router;