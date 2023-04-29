const express = require('express');
const skillsController = require('../controllers/skillsController');

const router = express.Router();

router.post('/', skillsController.skill_post);
// potentially move to another route
router.get('/create', skillsController.skillsCreator_get);
router.post('/search', skillsController.search_post);

module.exports = router;