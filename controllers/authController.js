const Applicant = require('../models/applicantModel');

const register_put = async(req, res)=>{
    const { email, password, name, surname } = req.body;
    
    Applicant.init().then(async() => {
        try{
            const applicant = await Applicant.create({ email, password, name, surname });
            console.log("New user %s created", email);

            //req.session.newly_registered = true;
            res.status(201).json({ redirect: 'login' });
                
        }catch(e){
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
        })
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
                console.log('OK');
            }else{
                res.status(403).json({ msg: 'Invalid credentials' });
            }
        } catch (e){
            console.log(e);

        }
    }
};

const login_get = (req, res) => {
    res.render('auth/login', { title: 'Login' })
};

module.exports = {
    register_put,
    register_get,
    login_get,
    login_post,
};