const express = require('express');
const jobAdvertRoute = require('../controllers/jobAdvertController');

const router = express.Router();

router.get('/view', jobAdvertRoute.showAdvert);

module.exports = router;