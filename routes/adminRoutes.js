const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');

const router = express.Router();
const upload = multer();

router.put('/add_organisation', [authMiddleware.require_admin, upload.none()], adminController.addOrganisation_put);
router.post('/modify_organisation', authMiddleware.require_admin, adminController.modifyOrganistation_post);
router.get('/manage_organisation', authMiddleware.require_admin, adminController.manageOrganisation_get);
router.post('/delete_organisation', authMiddleware.require_admin, adminController.deleteOrganisation_post);

router.put('/add_employer', [authMiddleware.require_admin, upload.none()], adminController.addEmployer_put);
router.post('/modify_employer', authMiddleware.require_admin, adminController.modifyEmployer_post);
router.get('/manage_employer', authMiddleware.require_admin, adminController.manageEmployer_get);
router.post('/delete_employer', [authMiddleware.require_admin, upload.none()], adminController.employer_delete);

router.get('/adminPanel', authMiddleware.require_admin, adminController.panel_get);
router.get('/show_organisations', adminController.show_organisations);

module.exports = router;