const JobOffer = require('../models/jobOfferModel');
const Applicant = require('../models/applicantModel');
const Application = require('../models/applicationModel');
const Stage = require('../models/stageModel');

const showApplyingForm = async (req, res) => {
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
                res.render('apply/applyingForm', { title: 'Aplikuj', jobAdvert, applicant, user: req.session.applicant ?? req.session.employer, scrollable: true });
            } 
        }
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const apply_post = async(req, res)=>{
    const { email, phoneNumber, homeAddress, jobOffer_id, applicationDate } = req.body;
    //let { relativeDocuments } = req.body;
    let relativeDocuments = req.body.relativeDocuments ? req.body.relativeDocuments : [];
    if(relativeDocuments.length != 0) {
        relativeDocuments = relativeDocuments.split(',');
    }
    const questionAnswers = req.body.additionalQuestions ? JSON.parse(req.body.additionalQuestions) : [];
    const relativeSkills = req.body.keywords ? JSON.parse(req.body.keywords) : [];
    const applicant_id = req.session.applicant._id;
    try {
        const ifApplied = await Application.find({applicant_id: applicant_id ,jobOffer_id: jobOffer_id});
        if(ifApplied.length > 0) {
            res.status(400).json({ errors: ["Już aplikowałeś na to ogłoszenie"] });
            return;
        }
        const createdApplication = await Application.create({ email, phoneNumber, homeAddress, jobOffer_id, applicationDate, questionAnswers, relativeSkills, applicant_id, relativeDocuments });
        const applicationID = createdApplication._id;
        await Stage.create({application_id: applicationID, index: 1, name: "Złożono", status: 0, lastChange: Date.now()});
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
    showApplyingForm,
    apply_post,
}
