const express = require('express');

const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/profile', (req, res) => {
    res.send("profile");
});
router.post('profile', profileController.profile_post);

module.exports = router;