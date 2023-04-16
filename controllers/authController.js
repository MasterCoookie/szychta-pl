const Applicant = require('../models/applicantModel');

const register_put = async(req, res)=>{
    const {email,password} = req.body;

    Applicant.init().then(async() => {
        try{
            const applicant = await Applicant.create({email, password, name, surname});
            console.log("New user %s created", email);

            req.session.newly_registered = true;
            res.status(201);
            res.json({redirect:'login'});
            res.edn();
        }catch(err){
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
            res.status(400).json({ errors });
        }
    })
};

module.exports = {
    register_put,
};