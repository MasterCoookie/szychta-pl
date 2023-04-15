const mongoose = require('mongoose');
const { isEmail, isMobilePhone, isUrl } = require('validator');

const applicantModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        maxlength: [64, 'Name too long']
    },
    surname: {
        type: String,
        required: [true, "Please provide a surname"],
        maxlength: [64, 'Surname too long']
    },
    uploadedDocuments: [String],
    email: {
        type: String,
        required: [true, "Please provide an email"],
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
        maxlength: [255, 'Address too long']
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