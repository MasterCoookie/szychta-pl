const JobOffer = require('../models/jobOfferModel');
const Application = require('../models/applicationModel');
const Applicant = require('../models/applicantModel');
const Skill = require('../models/skillsModel');
const Stage = require('../models/stageModel');

const applicationsView_get = async (req, res) => {
    try {
        const jobOffer = (await JobOffer.findById(req.query._id)).toObject();
        if (!jobOffer) {
            res.sendStatus(404);
        }
        const applications = await Application.find({ jobOffer_id: req.query._id });
        if(!applications) {
            res.sendStatus(404);
        }
        const getApplicantNames = async () => {
            let acc = {};
            for (let i = 0; i < applications.length; i++) {
                const applicant = await Applicant.findById(applications[i].applicant_id.toString());
                if (applicant) {
                    acc[applications[i].applicant_id] = applicant;
                }
                else {
                    res.sendStatus(404);
                }
            }
            return acc;
        }
        const applicantsWithId = await getApplicantNames();  
        res.render('applications/show_applications', { title: 'Wyświetlanie aplikacji', jobOffer, applications, applicantsWithId, user: req.session.applicant ?? req.session.employer, scrollable: true});
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

const applicationView_get = async (req, res) => {
    try {
        const application = await Application.findById( req.query._id );
        const jobOffer = await JobOffer.findById( application.jobOffer_id );
        const applicant = await Applicant.findById( application.applicant_id );
        const lastStage = await Stage.findOne({application_id: application._id}).sort({index:-1})
        if(!application || !jobOffer || !applicant) {
            res.sendStatus(404);
        }
        let skillNames = [];
        if (application.relativeSkills) {
            skillNames = await Skill.find({ _id: { $in: application.relativeSkills } });
        }
        res.render('applications/show_application_details', { title: 'Zarządzanie aplikacją', application, jobOffer, applicant, skillNames, lastStage, user: req.session.applicant ?? req.session.employer, scrollable: true});
    }
    catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}

const show_applicant_applications_get = async (req, res) => {
    try {
        const applications = await Application.find({ applicant_id: req.session.applicant._id });
        const getJobOffers = async () => {
            let acc = {};
            for (let i = 0; i < applications.length; i++) {
                const jobOffer = await JobOffer.findById(applications[i].jobOffer_id.toString());
                if (jobOffer) {
                    acc[applications[i].jobOffer_id] = jobOffer;
                    acc[applications[i].lastStage] = await Stage.findOne({application_id: applications[i]._id}).sort({index:-1});
                }
                else {
                    res.sendStatus(404);
                }
            }
            return acc;
        }
        const jobOffersWithId = await getJobOffers();
        if(!applications || !jobOffersWithId) {
            res.sendStatus(404);
        }
        res.render('applications/show_applicant_applications', { title: 'Wyświetlanie swoich aplikacji', applications, jobOffersWithId, user: req.session.applicant, scrollable: true});
    }
    catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}



module.exports = {
    applicationsView_get,
    applicationView_get,
    show_applicant_applications_get
}