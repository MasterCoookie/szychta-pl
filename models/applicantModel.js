const mongoose = require('mongoose');
const { isEmail, isMobilePhone, isUrl } = require('validator');
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

const applicantSchema = new mongoose.Schema({
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
    password: {
		type: String,
		required: [true, 'Please enter a password'],
		minlength: [8, 'Your password must be at least 8 characters long'],
		maxlength: [24, 'Your password must be shorter than 24 characters'],
		validate: [pwdValid, 'Your password must contain both letters (lowercase and uppercase) and numbers']
	},
    phoneNumber: {
        type: String,
        // validate: [isMobilePhone, "Phone number invalid"] //couses problems with no phone number in profile
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
    skills: [mongoose.Schema.Types.ObjectId],
});

//add your model mehtods here
applicantSchema.pre('save', async function(next) {  
    if (!this.isModified('password')){ 
        return next();
    }
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

applicantSchema.statics.login = async function(_email, _password) {
    const applicant = await this.findOne({ email: _email });
    if(applicant) {
        if (await bcrypt.compare(_password, applicant.password))
        {
            return applicant;
        }
        throw Error('Incorrect password');
    } else {
        throw Error('Invalid email');
    }
};


const Applicant = mongoose.model('Applicant', applicantSchema);

module.exports = Applicant;
