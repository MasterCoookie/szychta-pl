const JobOffer = require('../models/jobOfferModel');
const Application = require('../models/applicationModel');
const Applicant = require('../models/applicantModel');
const Skill = require('../models/skillsModel');
const Stage = require('../models/stageModel');
const Organisation = require('../models/organisationModel');
const mongoose = require('mongoose');

const data_join_get = async (req, res) =>{
    try {
        const applications = await Application.aggregate([
            {
                $lookup: {
                    from: "joboffers",
                    localField: "jobOffer_id",
                    foreignField: "_id",
                    as: "joinedjoboffers"
                }
            },
            {
                $lookup: {
                    from: "stages",
                    localField: "_id",
                    foreignField: "application_id",
                    as: "applicationstages"
                }
            },
            {
                $match: { "joinedjoboffers.organisation_id" : new mongoose.Types.ObjectId(req.session.employer.organisation_id) }
            },
        ]);
        console.log(applications);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

module.exports = {
    data_join_get
}