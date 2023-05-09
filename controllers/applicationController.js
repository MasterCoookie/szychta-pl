const JobOffer = require('../models/jobOfferModel');
const Application = require('../models/applicationModel');
const Applicant = require('../models/applicantModel');

const applicationsView_get = async (req, res) => {
    try {
        const jobOffer = (await JobOffer.findById(req.query._id)).toObject();
        if (!jobOffer) {
            res.sendStatus(404);
        }
        const applications = await Application.find({ jobOffer_id: req.query._id });
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
        res.render('employer/jobApplicationsView', { title: 'Pokaż aplikacje', jobOffer, applications, applicantsWithId, user: req.session.applicant ?? req.session.employer, scrollable: true});
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
};

module.exports = {
    applicationsView_get
}