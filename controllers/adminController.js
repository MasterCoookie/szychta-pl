const Employer = require('../models/employerModel');
const Organisation = require('../models/organisationModel');
fs = require('fs');
// Should this be splitted into employerController and organisationController?
const manageEmployer_get = async (req, res) => {
    try {
        const employer_id = req.query._id;
        const all_organisations = (await Organisation.find({})).map(org => org.toObject());
        let organisation = {};
        if (employer_id) {
            const employer = (await Employer.findById(employer_id)).toObject();
            if(employer.organisation_id) {
                const organisation = (await Organisation.findById(employer.organisation_id)).toObject();
                res.render('employer/manage_employer', { title: 'Edycja konta pracowniczego', employer, organisation,all_organisations, user: req.session.employer, scrollable: true });
            }           
            else{
                res.render('employer/manage_employer', { title: 'Edycja konta pracowniczego', employer, all_organisations, user: req.session.employer, scrollable: true });
            }
        } else {
            const passwordGenerator = ()=>{
                const length = 8;
                const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+?><:{}[]=-";
                let retVal = "";
                for (let i = 0, n = charset.length; i < length; ++i) {
                    retVal += charset.charAt(Math.floor(Math.random() * n));
                } 
                return retVal;
            }
            res.render('employer/manage_employer', { title: 'Tworzenie konta pracowniczego', all_organisations, passwordGenerator,user: req.session.employer, scrollable: true });
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}
const manageOrganisation_get = async (req, res) => {
    try {
        const organisation_id = req.query._id;
        if (organisation_id) {
            const organisation = (await Organisation.findById(organisation_id)).toObject();
            res.render('organisation/manage_organisation', { title: 'Edycja organizacji', organisation: organisation, user: req.session.employer, scrollable: true });
        } else {
            res.render('organisation/manage_organisation', { title: 'Tworzenie organizacji', user: req.session.employer, scrollable: true });
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}
const addOrganisation_put = async (req, res) => {
    const { name, description } = req.body;

    try {
        await Organisation.create({ name, description });
        console.log("New organisation %s created", name);
        res.sendStatus(201);
    } catch (e) {
        let errors = [];
        if (e.errors) {
            Object.values(e.errors).forEach(({ properties }) => {
                if (properties.message) {
                    errors.push(properties.message);
                }
            });
        }
        res.json({ errors });
    }
}
const addEmployer_put  =  async(req, res) =>{
    const { email, password, name, surname, permissionLevel } = req.body;
    let organisation_id = req.body.organisation_id ? req.body.organisation_id : null;
    try{
        await Employer.create({ email, password, name, surname, permissionLevel, organisation_id });
        console.log("New employer %s %s with permission level %s created", name, surname, permissionLevel);
        res.sendStatus(201);
    } catch(e) {
        let errors=[];
         if (e.code === 11000) {
            errors.push('Email already in use')
         }
        
        if(e.errors) {
            Object.values(e.errors).forEach(({ properties }) => {
                if (properties && properties.message) {
                    errors.push(properties.message);
                }
            });
        }
        res.status(400).json({ errors });
    }
};
const modifyOrganistation_post = async (req, res) => {
    const { name, description, organisation_id } = req.body;
    try {
        await Organisation.findByIdAndUpdate(organisation_id, { name, description });
        console.log("Organisation %s modified", name);
        if(req.file) {
            fs.existsSync(__dirname + '\\..\\public\\img\\logos\\' + organisation_id + '.png') && fs.unlinkSync(__dirname + '\\..\\public\\img\\logos\\' + organisation_id + '.png');
            fs.existsSync(__dirname + '\\..\\public\\img\\logos\\draft.png') && fs.renameSync(__dirname + '\\..\\public\\img\\logos\\draft.png', __dirname + '\\..\\public\\img\\logos\\' + organisation_id + '.png');
        }
        res.sendStatus(201);
    } catch (e) {
        let errors = [];
        if (e.errors) {
            Object.values(e.errors).forEach(({ properties }) => {
                if (properties.message) {
                    errors.push(properties.message);
                }
            });
        }
        res.json({ errors });
    }

}

const modifyEmployer_post = async (req, res) => {
    const {name, surname, email, permissionLevel, organisation_id, employer_id} = req.body;
    try{
        await Employer.findByIdAndUpdate(employer_id, {name, surname, email, permissionLevel, organisation_id});
        console.log("Employer %s modified", name);
        res.sendStatus(201);
    } catch (e) {
        let errors = [];
        if (e.errors) {
            Object.values(e.errors).forEach(({ properties }) => {
                if (properties.message) {
                    errors.push(properties.message);
                }
            });
        }
        res.json({ errors });
    }
}

const employer_delete = async (req, res) => {
    const { _id } = req.body;
    try {
        await Employer.init();
        await Employer.findByIdAndDelete(_id);
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const deleteOrganisation_post = async (req, res) => {
    const { _id } = req.body;
    try {
        await Organisation.init();
        await Organisation.findByIdAndDelete(_id);
        res.redirect('/admin/show_organisations'); // TODO implement message about succesful deletion
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const panel_get = async (req, res) => {
    // Check if user is admin
    if(req.session.authenticated) {
        res.render('admin/adminPanel', { title: 'Panel Administratora', user: req.session.employer });
    } else {
        res.redirect('/');
    }
}

const show_organisations = async (req, res) => {
    try {
        const organisations = (await Organisation.find({})).map(org => org.toObject());
        res.render('admin/show_organisations', { title: 'Organizacje', organisations, user: req.session.employer });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}
const show_employers = async (req, res) => {
    try {
        const employers = (await Employer.find().populate('organisation_id')).map(org => org.toObject());
        res.render('admin/show_employers', { title: 'Pracodawcy', employers, user: req.session.employer });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}
const deleteEmployer_post = async (req, res) => {
    const { _id } = req.body;
    try {
        await Employer.findByIdAndDelete(_id);
        res.redirect('/admin/show_employers'); // TODO implement message about succesful deletion
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}
module.exports = {
    manageEmployer_get,
    addEmployer_put,
    modifyEmployer_post,
    employer_delete,
    manageOrganisation_get,
    addOrganisation_put,
    modifyOrganistation_post,
    deleteOrganisation_post,
    panel_get,
    show_organisations,
    show_employers,
    deleteEmployer_post,
}