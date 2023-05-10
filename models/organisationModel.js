const mongoose = require('mongoose');

const organisationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for an organisation"],
        maxlength: [256, 'Name too long'],
        unique: true
    },
    description: {
        type: String,
        required: false, 
        maxlength: [1024, 'Description too long']
    },
});

const Organisation = mongoose.model('Organisation', organisationSchema);

module.exports = Organisation;
