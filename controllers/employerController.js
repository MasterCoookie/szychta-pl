const Employer = require('../models/empolyerModel');

const panel_get = (req, res) => {
    if(!req.session.authenticated){
        console.log('Redirect')
        res.render('employer/employerPanel', { title: 'employerPanel' });
    } else {
        console.log('Not authenticated')
        res.redirect('/');
    }
};

module.exports = {
    panel_get
};