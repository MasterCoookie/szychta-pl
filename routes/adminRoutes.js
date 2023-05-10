const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');

const router = express.Router();
const upload = multer();

router.put('/add_organisation', upload.none(), adminController.addOrganisation_put);
router.post('/modify_organisation', adminController.modifyOrganistation_post);
router.get('/manage_organisation', adminController.manageOrganisation_get);
router.post('/delete_organisation', adminController.delete_organisation_post);

router.put('/add_employer', upload.none(), adminController.addEmployer_put);
router.post('/modify_employer', adminController.modifyEmployer_post);
router.get('/manage_employer', adminController.manageEmployer_get);
router.post('/delete_employer', upload.none(), adminController.employer_delete);

router.get('/adminPanel',authMiddleware.require_login, adminController.panel_get);
router.get('/show_organisations', adminController.show_organisations);

module.exports = router;