const express = require('express');
const profileController = require('../controllers/profileController');
const jobOfferController = require('../controllers/jobOfferController');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const multer = require('multer');

const router = express.Router();
const upload = multer();

const docUpload = uploadMiddleware.docsUpload.single('doc');

const docUploadMiddleware = (req, res, next) => {
    docUpload(req, res, (err) => {
        if(err) {
            console.log('Upload middleware err: ' + err);
            res.status(400).json({ errors: err.message });
        }
        next();
    })
}

// router related routes
router.post('/profile/docs_upload', docUploadMiddleware, profileController.docs_upload_post)
router.get('/profile', profileController.profile_get);
router.post('/profile', profileController.profile_post);
router.delete('/profile/file_delete', upload.none(), profileController.file_delete);

// job offer related routes
router.get('/employer/show_offers', jobOfferController.showOffers_get);
router.get('/employer/add_offer', jobOfferController.addOffer_get);
router.post('/employer/add_offer', upload.none(), jobOfferController.addOffer_put);
router.get('/employer/modify_offer', jobOfferController.modifyOffer_get);
router.post('/employer/modify_offer', upload.none(), jobOfferController.modifyOffer_post);
router.delete('/employer/delete_offer', upload.none(), jobOfferController.offer_delete);

module.exports = router;
