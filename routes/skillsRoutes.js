const express = require('express');
const skillsController = require('../controllers/skillsController');

const router = express.Router();

router.post('/', skillsController.skill_post);

module.exports = router;