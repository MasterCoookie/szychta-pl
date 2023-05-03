const JobOffer = require('../models/jobOfferModel');
const Applicant = require('../models/applicantModel');

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
                const jobAdvert = await JobOffer.findById(req.query.id);
                res.render('apply/applyingFormula', { title: 'Apply', jobAdvert, applicant });
            } 
        }
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

module.exports = {
    showApplyingFormula
}