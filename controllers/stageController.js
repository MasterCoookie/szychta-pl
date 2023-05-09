const Application = require('../models/applicationModel');
const Stage = require('../models/stageModel');

const addStage_post = async (req, res) => { //not put because of possibly updating previous stage
    const { name, description, status, application_id, currentDate} = await req.body;
    let index;
    try {
        const lastStage = await Stage.findOne({application_id: application_id}).sort({index:-1})
        if (lastStage){
            console.log(lastStage);
            await Stage.findOneAndUpdate(lastStage._id, {$set: {status: 3, lastChange: currentDate}}); // set previous stage as closed (accepted)
            index = lastStage.index + 1;
        } else {
            index = 1;
        }
        await Stage.create({ application_id, index, name, description, status, lastChange: currentDate});
        console.log("New stage %s created", name);
        res.sendStatus(201);
    } catch (e) {
        console.log(e);
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
}

const manageStage_get = async (req, res) => {
    try {
        const application_id = req.query.application; // if present - create new and close all old
        const stage_id = req.query.stage; // else modify existing
        if (application_id) {
            const application = (await Application.findById(application_id)).toObject();
            if (application) {
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
    const {name, description, status, stage_id, currentDate} = req.body;
    try {
        await Stage.findByIdAndUpdate(stage_id,{ name: name, description: description, status: status, lastChange: currentDate});
        console.log("Stage %s modified", name);
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
}

module.exports = {
    manageStage_get,
    addStage_post,
    modifyStage_post
}
