const Employer = require('../models/empolyerModel');

const panel_get = (req, res) => {
    if(req.session.authenticated){
        res.render('employer/employerPanel', { title: 'employerPanel' });
    } else {
        res.redirect('/');
    }
};

module.exports = {
    panel_get
};
