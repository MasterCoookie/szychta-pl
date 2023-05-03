const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [32, 'Name must be less than 32 characters long'],
    },
    description: {
        type: String,
        maxlength: [200, 'Description must be less than 200 characters long'],
    },
    keywords: {
        type: [String],
        maxlength: [32, 'Keywords must be less than 32 characters long'],
    }
});

const Skill = mongoose.model('Skill', skillsSchema);

module.exports = Skill;