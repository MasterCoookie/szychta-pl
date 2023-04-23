const Applicant = require('../models/applicantModel');
const sessionController = require('./sessionController')

const register_put = async(req, res)=>{
    const { email, password, name, surname } = req.body;
    
    try{
        await Applicant.init();
        const applicant = await Applicant.create({ email, password, name, surname });
        console.log("New user %s created", email);
        //req.session.newly_registered = true;
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
            // console.log(e);
            res.json({ errors });
        }
        
};

const register_get = (req, res) => {
    res.render('auth/register', { title: 'Register' });
};

const login_post = async (req, res) => {
    const {email, password} = req.body;

    if (email && password) {
        try {
            const applicant = await Applicant.login(email, password);
            if (applicant) {
                console.log("Loged in");
                sessionController.sessionAuthentication(req);
                sessionController.sendAplicantInfoToSession(req, applicant.name, applicant.email, applicant._id);
                res.status(202).json({ redirect: 'profile' });
            } else {
                res.status(400).json({ msg: 'Niewłaściwe dane' });
            }
        } catch (e) {
            //res.json(e);
            res.status(400).json({ msg: 'Niewłaściwe dane' });
        }
    } else {
        res.status(400).json({ msg: 'Niewłaściwe dane' });
    }
};

const login_get = (req, res) => {
    if(!req.session.authenticated){
        res.render('auth/login', { title: 'Login' });
    } else {
        res.redirect('/');
    }
};


module.exports = {
    register_put,
    register_get,
    login_get,
    login_post,
    logout_get,
};
