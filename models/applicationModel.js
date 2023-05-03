const mongoose = require('mongoose');
const { isEmail, isMobilePhone } = require('validator');

const applicationSchema = new mongoose.Schema({
    applicantID: {
        type: String,
        required: [true, "Please provide an applicantID"],
    },
    jobOfferID: {
        type: String,
        required: [true, "Please provide a jobOfferID"],
    },
    applicationDate: {
        type: Date,
        required: [true, "Application date is required"],
    },
    relativeDocuments: {
        type: [String],
    },
    relativeSkills: {
        type: [String],
    },
    questionAnswers: {
        type: [String],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        validate: [isEmail, "Email invalid"]
    },
    phoneNumber: {
        type: String,
        validate: [isMobilePhone, "Phone number invalid"]
    },
    homeAddress: {
        type: String,
    }
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;