const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stageSchema = new mongoose.Schema({
    application_id: {
        type: Schema.Types.ObjectId,
        required: [true, "Stage cannot be an orphan"]
    },
    index: { // which stage it is (for given application), is handled controller-side
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
    lastChange: { // is handled controller-side
        type: Date,
        required: [true, "Stage is changed in our universe, where time has significant impact on living beings"]
    },
});

stageSchema.methods.getStatus = function() {
    if (this.status === 0){
        return "Nierozpatrzony";
    } else if (this.status === 1){
        return "W trakcie rozpatrywania";
    } else if (this.status === 2){
        return "Zwrócony";
    } else if (this.status === 3){
        return "Zaakceptowany";
    } else if (this.status === 4){
        return "Odrzucony";
    }
};

const Stage = mongoose.model('Stage', stageSchema);

module.exports = Stage;
