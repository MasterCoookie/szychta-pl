const express = require('express');
const skillsController = require('../controllers/skillsController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware.require_secretary, skillsController.skill_post);
// potentially move to another route
router.get('/create', authMiddleware.require_secretary, skillsController.skillsCreator_get);
router.post('/search', skillsController.search_post);

module.exports = router;