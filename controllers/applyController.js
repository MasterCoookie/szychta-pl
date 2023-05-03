const JobOffer = require('../models/jobOfferModel');
const Applicant = require('../models/applicantModel');
const Application = require('../models/applicationModel');

const showApplyingFormula = async (req, res) => {
    try {
        if(req.query.id == null) {
            res.sendStatus(404);
        }
        else {
            const _id = req.session.applicant._id;
            const applicant = (await Applicant.findById(_id)).toObject();
            if (!applicant) {
                res.sendStatus(404);
            }
            else {
                const jobAdvert = (await JobOffer.findById(req.query.id)).toObject();
                res.render('apply/applyingFormula', { title: 'Apply', jobAdvert, applicant });
            } 
        }
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const apply_post = async(req, res)=>{
    const { email, phoneNumber, homeAddress, jobAdvertID, applicationDate } = req.body;
    console.log(req.body);
    const additionalQuestions = req.body.additionalQuestions ? JSON.parse(req.body.additionalQuestions) : [];
    const keywords = req.body.keywords ? JSON.parse(req.body.keywords) : [];
    try {
        const jobAdvert = await Application.create({ email, phoneNumber, homeAddress, jobAdvertID, applicationDate, additionalQuestions, keywords });
        console.log("Application %s created", jobAdvert._id);
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
    
};

module.exports = {
    showApplyingFormula,
    apply_post,
}
