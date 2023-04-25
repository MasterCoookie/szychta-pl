const JobOffer = require('../models/jobOfferModel');

const showOffers_get = async (req, res) => {
    try {
        const jobOffers = await JobOffer.find();
        res.render('jobOffer/show_offers', { title: 'Show offers', jobOffers });
        // empty list handled in frontend
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const addOffer_put = async (req, res) => {
    const { title, description, requirements, salary, location, tags } = req.body;

    try {
        await JobOffer.init();
        const jobOffer = await JobOffer.create({ title, description, requirements, salary, location, tags });
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

const manageOffer_get = (req, res) => {
    try {
        res.render('jobOffer/manage_offer', { title: 'Create or Edit offer' });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const modifyOffer_post = async (req, res) => {
    const { title, description, requirements, salary, location, tags } = req.body;

    try {
        const jobOffer = await JobOffer.findByIdAndUpdate(req.body._id, { title, description, requirements, salary, location, tags },
            { runValidators: true });
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
    manageOffer_get,
    addOffer_put,
    modifyOffer_post,
    offer_delete
}