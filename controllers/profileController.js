const Applicant = require('../models/apllicantModel');

const profile_post = async (req, res) => {
    // get user id
    // TODO read from session
    const _id = '64397e2fbed0bea2e17824d2';
    const { name, surname, email, phoneNumber, birthDate, homeAdress, links } = req.body;
    try {
        await Applicant.findByIdAndUpdate(_id, { name, surname, email, phoneNumber, birthDate, homeAdress, links });
        res.sendStatus(200);
    }
    catch (e) {
        let errors = [];
        if (e.code === 11000) {
            errors.push('Email already in use')
        }
        Object.values(e.errors).forEach(({ properties }) => {
            if (properties.message) {
                errors.push(properties.message);
            }
        });
        console.log(e);
        res.sendStatus(400).json(errors);
    }
}
const profile_get = async (req, res) => {
    try {
        const applicant = new Applicant({ name: 'dupa', surname: 'dupa2', email: 'pat.i.mat233@gmail.com', phoneNumber: '224444444', birthDate: '12.12.2001', homeAdress: 'kasztanowa 52 lipinki łużyckie', links: ['patrzuwa.ga', 'macibol.ga'] });
        await applicant.save(applicant);
        res.sendStatus(200);
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = { profile_post, profile_get };