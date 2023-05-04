const mongoose = require('mongoose');
const { isEmail, isMobilePhone } = require('validator');
const Schema = mongoose.Schema;

const applicationSchema = new mongoose.Schema({
    applicant_id: {
        type: Schema.Types.ObjectId,
        required: [true, "Please provide an applicantID"],
    },
    jobOffer_id: {
        type: Schema.Types.ObjectId,
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
        type: [Schema.Types.ObjectId],
    },
    questionAnswers: {
        type: {},
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