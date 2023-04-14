const express = require('express');

const router = express.Router();

router.get('/profile', (req, res) => {
    res.send("profile");
});
router.post('profile', );

module.exports = router;