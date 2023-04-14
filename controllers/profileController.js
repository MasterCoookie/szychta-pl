const Applicant = require('../models/apllicantModel');
const profile_post = async (req, res) => {
    // get user id
    // TODO read from session
    const _id = 0;
    const { name, surname, email, phoneNumber, birthDate, homeAdress, links } = req.body;
    try {
        Applicant.findByIdAndUpdate(_id, { name, surname, email, phoneNumber, birthDate, homeAdress, links });
        res.sendStatus(200);
    }
    catch (e) {
        let errors = [];
        if (e.code === 11000) {
            errors.push("Email already in use")
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