const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stageSchema = new mongoose.Schema({
    application_id: {
        type: Schema.Types.ObjectId,
        required: [true, "Stage cannot be an orphan"]
    },
    index: { // which stage it is (for given application), will be handled controller-side
        type: Number,
        required: [true, "Stage must have an index"]
    }, 
    name: {
        type: String,
        required: [true, "Please provide a name"],
        minLength: [3, 'Stage name must be at least 3 characters long'],
        maxLength: [256, 'Stage name too long']
    },
    description: {
        type: String,
        maxlength: [4096, 'Description is too long']
    },
    status: {
		type: Number, // 0 - not processed, 1 - in progress, 2 - returned, 3 - accepted, 4 - rejected
        min: [0, "Invalid status code"],
        max: [4, "Invalid status code"]
	},
    lastChange: { // will be handled controller-side
        type: Date,
        required: [true, "Stage is changed in our universe, where time has significant impact on living beings"]
    },
});

const Stage = mongoose.model('Stage', stageSchema);

module.exports = Stage;
