const express = require('express');
const pdfController = require('../controllers/pdfController');

const router = express.Router();

router.get('/test', pdfController.testPdf_get);

module.exports = router;
