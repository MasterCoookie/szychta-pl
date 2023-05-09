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
        res.render('applications/jobApplicationsView', { title: 'Wyświetl aplikacje', jobOffer, applications, applicantsWithId, user: req.session.applicant ?? req.session.employer, scrollable: true});
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
        if(!application || !jobOffer || !applicant) {
            res.sendStatus(404);
        }
        res.render('applications/applicationView', { title: 'Pokaż aplikację', application, jobOffer, applicant, user: req.session.applicant ?? req.session.employer, scrollable: true});
    }
    catch(err) {
        console.log(err);
        res.sendStatus(500);
    }

}

module.exports = {
    applicationsView_get,
    applicationView_get
}