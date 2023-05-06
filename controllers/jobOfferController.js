const JobOffer = require('../models/jobOfferModel');

const getModeArray = (_mode0, _mode1, _mode2) =>{
    let mode = [];
    if (_mode0){
        mode.push(0);
    }
    if (_mode1){
        mode.push(1);
    }
    if (_mode2){
        mode.push(2);
    }
    return mode;
}

const showOffers_get = async (req, res) => {
    try {
        const jobOffers = await JobOffer.find();
        res.render('jobOffer/show_offers', { title: 'Show offers', jobOffers, user: req.session.applicant ?? req.session.employer, scrollable: true  });
        // empty list handled in frontend
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const showOfferDetails_get = async (req, res) => {
    try {
        const jobOffer = await JobOffer.findById(req.query._id);
        if (!jobOffer) {
            res.sendStatus(404);
            return;
        }
        res.render('jobOffer/show_offer_details', { title: 'Show offer details', jobOffer, user: req.session.applicant ?? req.session.employer });
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const addOffer_put = async (req, res) => {
    const { title, description, requirements, salary, location, industry, expiryDate, organisation_id, mode0, mode1, mode2} = req.body;
    const additionalQuestions = req.body.additionalQuestions ? JSON.parse(req.body.additionalQuestions) : [];
    const keywords = req.body.keywords ? JSON.parse(req.body.keywords) : [];

    const requirementsArray = requirements.split(';').filter((value) => value != '');

    let mode = getModeArray(mode0, mode1, mode2);
    try {
        await JobOffer.create({ title, description, mode, salary, requirements : requirementsArray, location, industry, additionalQuestions, keywords, expiryDate, organisation_id});
        console.log("New job offer %s created", title);
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

const manageOffer_get = async (req, res) => {
    try {
        const offer_id = req.query.offer;
        if (offer_id) {
            const offer = (await JobOffer.findById(offer_id)).toObject();
            res.render('jobOffer/manage_offer', { title: 'Edit offer', offer, user: req.session.employer, scrollable: true, pickedSkills: offer.requirements.map(skill => skill.toString()) });
        } else {
            res.render('jobOffer/manage_offer', { title: 'Create offer', user: req.session.employer, scrollable: true });
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const modifyOffer_post = async (req, res) => {
    const { title, description, requirements, salary, location, industry, expiryDate, organisation_id, mode0, mode1, mode2, offer_id} = req.body;
    const additionalQuestions = req.body.additionalQuestions ? JSON.parse(req.body.additionalQuestions) : [];
    const keywords = req.body.keywords ? JSON.parse(req.body.keywords) : [];


    const requirementsArray = requirements.split(';').filter((value) => value != '');

    let mode = getModeArray(mode0, mode1, mode2);
    try {
        await JobOffer.findByIdAndUpdate(offer_id, { title, description, mode, salary, requirements: requirementsArray, location, industry, additionalQuestions, keywords, expiryDate, organisation_id});
        console.log("Job offer %s modified", title);
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

const offer_delete = async (req, res) => {
    const { _id } = req.body;
    try {
        await JobOffer.init();
        await JobOffer.deleteOne({ _id });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

module.exports = {
    showOffers_get,
    showOfferDetails_get,
    manageOffer_get,
    addOffer_put,
    modifyOffer_post,
    offer_delete
}
