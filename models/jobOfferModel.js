const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobOfferSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        maxlength: [256, 'Name too long']
    },
    description: {
        type: String,
        maxlength: [4096, 'Description is too long']
    },
    mode: {
        type: [Number],
        validate: [(val) => val.length > 0 , 'Must have minimum one type in range 1-3']
    },
    salary: String,
    requirements: {
		type: [Schema.Types.ObjectId],
		required: [true, 'Requirements are necessary'],
	},
    location: {
        type: String
        //possibbly-TODO external locations database
    },
    industry: [String],
    additionalQuestions: [String],
    keywords: [String],
    expiryDate: Date,
    organisation_id: {
        type: Schema.Types.ObjectId,
        required: [true, "Offer cannot be an orphan"]
    }
});

const JobOffer = mongoose.model('JobOffer', jobOfferSchema);

module.exports = JobOffer;
