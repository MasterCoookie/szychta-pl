const require_login = (req, res, next) => {
    if(req.session.authenticated) {
        next();
    } else {
        res.redirect('/auth/login');
    }
}

const require_secretary = (req, res, next) => {
    if(req.session.employer && req.session.employer.level >= 1) {
        next();
    } else {
        res.redirect('/');
    }
}

const require_recruiter = (req, res, next) => {
    if(req.session.employer && req.session.employer.level >= 2) {
        next();
    } else {
        res.redirect('/');
    }
}

const require_admin = (req, res, next) => {
    if(req.session.employer && req.session.employer.level >= 3) {
        next();
    } else {
        res.redirect('/');
    }
}

const prevent_employer = (req, res, next) => {
    if(req.session.employer) {
        res.send('You can\'t proceed as an employer');
    } else {
        next();
    }
}

module.exports = {
    require_login,
    require_secretary,
    require_recruiter,
    require_admin,
    prevent_employer
}