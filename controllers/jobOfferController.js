const JobOffer = require('../models/jobOfferModel');
const Skill = require('../models/skillsModel');
const ejs = require('ejs');

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

const showOffersFiltered_post = async (req, res) => {
    try {
        let query = {};
        if (req.body.keywords) {
            query.keywords = { $in: req.body.keywords };
        }
        if (req.body.location) {
            query.location = { $regex: req.body.location, $options: 'i' };
        }
        if (req.body.mode0 || req.body.mode1 || req.body.mode2) {
            query.mode = getModeArray(req.body.mode0, req.body.mode1, req.body.mode2);
        }
        if (req.body.industry) {
            query.industry = { $in: req.body.industry };
        }
        const jobOffers = await JobOffer.find(query);
        const html = await ejs.renderFile('./views/jobOffer/offers_list.ejs', {jobOffers})
        res.send(html);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const showOffers_get = async (req, res) => {
    try {
        const jobOffers = await JobOffer.find();
        res.render('jobOffer/show_offers', { title: 'Pokaż oferty', jobOffers, user: req.session.applicant ?? req.session.employer, scrollable: true  });
        // empty list handled in frontend
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const showOfferDetails_get = async (req, res) => {
    try {
        const jobOffer = await JobOffer.findById(req.query.id);
        if (!jobOffer) {
            res.sendStatus(404);
            return;
        }
        let skillsNames = [];
        if (jobOffer.requirements) {
            skillsNames = await Skill.find({ _id: { $in: jobOffer.requirements } });
        }
        // TODO:
        // get organistaion from id and send it over render
        res.render('jobOffer/show_offer_details', { title: 'Pokaż szczegóły oferty', jobOffer, user: req.session.applicant ?? req.session.employer, skillsNames });
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const addOffer_put = async (req, res) => {
    const { title, description, requirements, salary, location, industry, expiryDate, mode0, mode1, mode2} = req.body;
    const additionalQuestions = req.body.additionalQuestions ? JSON.parse(req.body.additionalQuestions) : [];
    const keywords = req.body.keywords ? JSON.parse(req.body.keywords) : [];

    const requirementsArray = requirements.split(';').filter((value) => value != '');

    let mode = getModeArray(mode0, mode1, mode2);
    try {
        const organisation_id = req.session.employer.organisation_id;
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
            res.render('jobOffer/manage_offer', { title: 'Edycja oferty pracy', offer, user: req.session.employer, scrollable: true, pickedSkills: offer.requirements.map(skill => skill.toString()) });
        } else {
            res.render('jobOffer/manage_offer', { title: 'Tworzenie oferty pracy', user: req.session.employer, scrollable: true });
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const modifyOffer_post = async (req, res) => {
    const { title, description, requirements, salary, location, industry, expiryDate, mode0, mode1, mode2, offer_id} = req.body;
    const additionalQuestions = req.body.additionalQuestions ? JSON.parse(req.body.additionalQuestions) : [];
    const keywords = req.body.keywords ? JSON.parse(req.body.keywords) : [];


    const requirementsArray = requirements.split(';').filter((value) => value != '');

    let mode = getModeArray(mode0, mode1, mode2);
    try {
        const organisation_id = req.session.employer.organisation_id;
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
    showOffersFiltered_post,
    showOfferDetails_get,
    manageOffer_get,
    addOffer_put,
    modifyOffer_post,
    offer_delete
}
