const express = require('express');
const profileController = require('../controllers/profileController');
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

router.post('/profile/docs_upload', docUploadMiddleware, profileController.docs_upload_post)
router.get('/profile', profileController.profile_get);
router.post('/profile', profileController.profile_post);
router.delete('/profile/file_delete', upload.none(), profileController.file_delete);

module.exports = router;