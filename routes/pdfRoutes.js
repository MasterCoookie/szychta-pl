const express = require('express');
const pdfController = require('../controllers/pdfController');
const multer = require('multer');

const router = express.Router();
const upload = multer();

router.get('/test', pdfController.testPdf_get);
router.get('/generateTemplate', pdfController.generateTemplate_get);
router.get('/generatePdf', upload.none() ,pdfController.generatePdf_get);

module.exports = router;
