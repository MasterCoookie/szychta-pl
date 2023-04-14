const mongoose = require('mongoose');
const { isEmail, isMobilePhone, isUrl } = require('validator');

const applicantModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    uploadedDocuments: [String],
    email: {
        type: String,
        required: true,
        validate: [isEmail, "Email invalid"],
        unique: [true, "Email already in use"],
    },
    phoneNumber: {
        type: String,
        validate: isMobilePhone
    },
    birthDate: {
        type: Date,
    },
    homeAddress: {
        type: String,
    },
    links: {
        type: [String],
        //TODO validate
        // validate: v=> v.forEach(link => {
        //   return isUrl(link);  
        // })
    },
});

//add your model mehtods here

const Applicant = mongoose.model('Applicant', applicantModel);

module.exports = Applicant;