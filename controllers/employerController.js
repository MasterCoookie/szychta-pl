const Employer = require('../models/employerModel');

const panel_get = (req, res) => {
    if(req.session.authenticated){
        res.render('employer/employerPanel', { title: 'panelPracownika' });
    } else {
        res.redirect('/');
    }
};

module.exports = {
    panel_get
};
