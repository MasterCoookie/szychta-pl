const express = require('express');
const profileController = require('../controllers/profileController');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const jobOfferController = require('../controllers/jobOfferController');
const multer = require('multer');

const router = express.Router();
const upload = multer();

const docUpload = uploadMiddleware.docsUpload.single('doc');
const profilePicUpload = uploadMiddleware.profilePicUpload.single('profilePicture');

const docUploadMiddleware = (req, res, next) => {
    docUpload(req, res, (err) => {
        if(err) {
            console.log('Doc upload middleware err: ' + err);
            res.status(400).json({ errors: err.message });
        } else {
            next();
        }
    });
}

const profilePicUploadMiddleware = (req, res, next) => {
    profilePicUpload(req, res, (err) => {
        if(err) {
            console.log('ProfilePic upload middleware err: ' + err);
            res.status(400).json({ errors: err.message });
        } else {
            next();
        }
    });
}


router.post('/profile/docs_upload', [docUploadMiddleware, authMiddleware.require_login], profileController.docs_upload_post);
router.get('/profile', authMiddleware.require_login, profileController.profile_get);
router.post('/profile', [profilePicUploadMiddleware, authMiddleware.require_login], profileController.profile_post);
router.delete('/profile/file_delete', authMiddleware.require_login, profileController.file_delete);
router.get('/profile/docs', authMiddleware.require_login, profileController.docs_get);

router.get('/offers', jobOfferController.showOffers_get);

module.exports = router;
