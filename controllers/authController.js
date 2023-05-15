const Applicant = require('../models/applicantModel');
const Employer = require('../models/employerModel');
const sessionController = require('./sessionController');

const register_put = async(req, res)=>{
    const { email, password, name, surname } = req.body;
    
    try{
        const applicant = await Applicant.create({ email, password, name, surname });
        console.log("New user %s created", email);
        res.status(201).json({ redirect: 'login' });
            
    } catch(e) {
        let errors=[];
         if (e.code === 11000) {
            errors.push('Email already in use')
         }
        
        if(e.errors) {
            Object.values(e.errors).forEach(({ properties }) => {
                if (properties.message) {
                    errors.push(properties.message);
                }
            });
        }
        res.status(400).json({ errors });
    }
        
};

//should be move to admin controller when created
const createEmployer_put = async(req, res) =>{
    const { email, password, name, surname, permissionLevel } = req.body;

    try{
        const employer = await Employer.create({ email, password, name, surname,permissionLevel });
        console.log("New employer %s created", email, permissionLevel);
        res.status(201).json({ redirect: 'login'});
    } catch(e) {
        let errors=[];
         if (e.code === 11000) {
            errors.push('Email already in use')
         }
        
        if(e.errors) {
            Object.values(e.errors).forEach(({ properties }) => {
                if (properties.message) {
                    errors.push(properties.message);
                }
            });
        }
        res.status(400).json({ errors });
    }
};


const register_get = (req, res) => {
    res.render('auth/register', { title: 'Register' });
};

const login_post = async (req, res) => {
    const {email, password} = req.body;

    if (email && password) {
        try {
            const isEmployer = await Employer.findOne({ email: email });
            if(isEmployer) {
                const employer = await Employer.login(email, password);
                if(employer) {
                    console.log("Logged in %s as employer", email);
                    sessionController.authenticationAfterLoggingIn(req);
                    sessionController.saveEmployerInfoToSession(req, employer.name, employer.surname, employer.email, employer.permissionLevel, employer._id, employer.organisation_id);
                    res.status(202).json({ redirect: 'panel' });
                } else {
                res.status(400).json({ msg: 'Niewłaściwe dane' });
                }
            } else {
                const isApplicant = await Applicant.findOne({ email: email });
                if(isApplicant) {
                    const applicant = await Applicant.login(email, password);
                    if (applicant) {
                        console.log("Logged in %s", email);
                        sessionController.authenticationAfterLoggingIn(req);
                        sessionController.saveApplicantInfoToSession(req, applicant.name, applicant.surname, applicant.email, applicant._id);
                        res.status(202).json({ redirect: 'profile' });
                    } else {
                        res.status(400).json({ msg: 'Niewłaściwe dane' });
                    }
                }
            }
            res.status(400).json({ msg: 'Nie ma konta stworzonego <br> na podany e-mail' })
        } catch (e) {
            res.status(400).json({ msg: 'Niewłaściwe dane' });
        }
    } else {
        res.status(400).json({ msg: 'Niewłaściwe dane' });
    }
};

const login_get = (req, res) => {
    if(!req.session.authenticated){
        res.render('auth/login', { title: 'Login', user: null });
    } else {
        res.redirect('/');
    }
};

const logout_get = (req, res) => {
    sessionController.destroySession(req);
    res.redirect('/');
};

module.exports = {
    register_put,
    createEmployer_put,
    register_get,
    login_get,
    login_post,
    logout_get,
};
