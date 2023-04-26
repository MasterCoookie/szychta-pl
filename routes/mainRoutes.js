const express = require('express');
const profileController = require('../controllers/profileController');
const uploadMiddleware = require('../middleware/uploadMiddleware');
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

// profile related routes
router.post('/profile/docs_upload', docUploadMiddleware, profileController.docs_upload_post)
router.get('/profile', profileController.profile_get);
router.post('/profile', profilePicUploadMiddleware, profileController.profile_post);
router.delete('/profile/file_delete', upload.none(), profileController.file_delete);

module.exports = router;
