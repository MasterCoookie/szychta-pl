const JobOffer = require('../models/jobOfferModel');

const showAdvert = async (req, res) => {
    try {
        console.log(req.query);
        const jobAdvert = await JobOffer.findById(req.query.id);
        console.log(jobAdvert);
        res.render('jobAdvert/show_advert', { title: 'Show advert', jobAdvert });
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

module.exports = {
    showAdvert
}