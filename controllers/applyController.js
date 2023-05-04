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
    const { email, phoneNumber, homeAddress, jobAdvertID, applicationDate, relativeDocuments } = req.body;
    const questionAnswers = req.body.additionalQuestions ? JSON.parse(req.body.additionalQuestions) : [];
    const relativeSkills = req.body.keywords ? JSON.parse(req.body.keywords) : [];
    const applicantID = req.session.applicant._id;
    try {
        const application = await Application.create({ email, phoneNumber, homeAddress, jobAdvertID, applicationDate, questionAnswers, relativeSkills, applicantID, relativeDocuments });
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
        res.status(400).json({ errors });
        
    }
    
};

module.exports = {
    showApplyingFormula,
    apply_post,
}
