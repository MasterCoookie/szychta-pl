const JobOffer = require('../models/jobOfferModel');
const Application = require('../models/applicationModel');
const Skill = require('../models/skillsModel');
const Stage = require('../models/stageModel');
const mongoose = require('mongoose');

const stage_data_get = async (req, res, chosenJob) =>{
    try {
        let stagesSum = 0;
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
                $match: { "joinedjoboffers.organisation_id" : new mongoose.Types.ObjectId(req.session.employer.organisation_id), jobOffer_id: new mongoose.Types.ObjectId(chosenJob) }
            },
            {
                $project: {
                    numberOfStages: {$cond: { if: {$isArray: "$applicationstages"}, then: { $size: "$applicationstages"}, else: ""}}
                }
            },
        ]);
        for(let i=0; i< applications.length; i++)
        {   
            if(applications[i].numberOfStages){
                stagesSum += applications[i].numberOfStages;
            }
        }
        console.log(stagesSum)
        return stagesSum;
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

const organistaion_jobOffers_get = async (req, res) =>{
    try {
        const jobOffers = await JobOffer.find({ organisation_id: req.session.employer.organisation_id }).count();  
        console.log(jobOffers)
        return jobOffers; 
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

const jobOffer_applications_get = async (req, res, chosenJob) =>{
    try {
        const applications = await Application.find({ jobOffer_id: chosenJob }).count() ; 
        console.log(applications)
        return applications;
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

const stage_status_get = async (req, res, chosenJob) =>{
    try {
        let statusTable = [];
        for(let i = 0; i<5; i++) {
            const stages = await Stage.aggregate([
                {
                    $lookup: {
                        from: "applications",
                        localField: "application_id",
                        foreignField: "_id",
                        as: "application"
                    }
                }, 
                {
                    $match: { "application.jobOffer_id": new mongoose.Types.ObjectId(chosenJob),  status: i }
                },
                {
                    $count: "stageStatus"
                }
            ]);
            statusTable.push(stages.stageStatus);
            console.log(stages);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

module.exports = {
    stage_data_get,
    organistaion_jobOffers_get,
    jobOffer_applications_get,
    stage_status_get
}