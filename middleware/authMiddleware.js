const require_login = (req, res, next) => {
    if(req.session.authenticated) {
        next();
    } else {
        res.redirect('/auth/login');
    }
}

module.exports = {
    require_login,
}