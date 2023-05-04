const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const pwdValid = (password) => {
    if(/^\d+$/.test(password) || /^[a-zA-Z]+$/.test(password)) {
        return false;
    }
    if(password.toUpperCase() === password || password.toLowerCase() === password) {
        return false;
    }
    return true;
}

const employerSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: [true, "Please provide an email"],
        validate: [isEmail, "Email invalid"],
        unique: [true, "Email already in use"],
    },
    password: {
		type: String,
		required: [true, 'Please enter a password'],
		minlength: [8, 'Your password must be at least 8 characters long'],
		maxlength: [24, 'Your password must be shorter than 24 characters'],
		validate: [pwdValid, 'Your password must contain both letters (lowercase and uppercase) and numbers']
	},
    permissionLevel: {
        type: Number,
        default: 1
    },
});

employerSchema.pre('save', async function(next) {  
    if (!this.isModified('password')){ 
        return next();
    }
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

employerSchema.statics.login = async function(_email, _password) {
    const employer = await this.findOne({ email: _email });
    if(employer) {
        if (await bcrypt.compare(_password, employer.password))
        {
            return employer;
        }
        throw Error('Incorrect password');
    } else {
        throw Error('Invalid email');
    }
};

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;