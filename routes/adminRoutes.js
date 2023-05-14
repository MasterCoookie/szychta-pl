const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const multer = require('multer');

const router = express.Router();
const upload = multer();
const logoUpload = uploadMiddleware.logoUpload.single('logo');

const logoUploadMiddleware = (req, res, next) => {
    logoUpload(req, res, (err) => {
        if(err) {
            console.log('Logo upload middleware err: ' + err);
            res.status(400).json({ errors: err.message });
        } else {
            next();
        }
    });
}

router.put('/add_organisation', [authMiddleware.require_admin, upload.none()], adminController.addOrganisation_put);
router.post('/modify_organisation', [authMiddleware.require_admin, logoUploadMiddleware], adminController.modifyOrganistation_post);
router.get('/manage_organisation', authMiddleware.require_admin, adminController.manageOrganisation_get);
router.post('/delete_organisation', authMiddleware.require_admin, adminController.deleteOrganisation_post);

router.put('/add_employer', [authMiddleware.require_admin, upload.none()], adminController.addEmployer_put);
router.post('/modify_employer', [authMiddleware.require_admin, upload.none()], adminController.modifyEmployer_post);
router.get('/manage_employer', authMiddleware.require_admin, adminController.manageEmployer_get);
router.post('/delete_employer', [authMiddleware.require_admin, upload.none()], adminController.deleteEmployer_post);

router.get('/adminPanel', authMiddleware.require_admin, adminController.panel_get);
router.get('/show_organisations', authMiddleware.require_admin, adminController.show_organisations);
router.get('/show_employers', authMiddleware.require_admin, adminController.show_employers);

module.exports = router;