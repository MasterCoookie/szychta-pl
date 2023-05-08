const Application = require('../models/applicationModel');
const Stage = require('../models/stageModel');

const addStage_put = async (req, res) => {
    
}

const manageStage_get = async (req, res) => {
    try {
        const application_id = req.query.application; // if present - create new and close all old
        const stage_id = req.query.stage; // else modify existing
        if (application_id) {
            const application = (await Application.findById(application_id)).toObject();
            if (application) {
                //todo: add previous stage closing
                res.render('stage/manage_stage', { title: 'Dodaj etap rekrutacji', application, user: req.session.employer, scrollable: true});
            } else {
                res.sendStatus(404);
            }
        } else if (stage_id) {
            const stage = (await Stage.findById(stage_id)).toObject();
            if (stage) {
                res.render('stage/manage_stage', { title: 'Modyfikuj etap rekrutacji', stage, user: req.session.employer, scrollable: true});
            } else {
                res.sendStatus(404);
            }
        } else {
            res.sendStatus(500);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const modifyStage_post = async (req, res) => {
    
}

module.exports = {
    manageStage_get,
    addStage_put,
    modifyStage_post
}
