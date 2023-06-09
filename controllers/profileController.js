const Applicant = require('../models/applicantModel');
const Skill = require('../models/skillsModel');
const fs = require('fs');
const bcrypt = require('bcrypt');

const profile_post = async (req, res) => {
    const _id = req.session.applicant._id;

    const { name, surname, email, phoneNumber, birthDate, homeAddress, skills } = req.body;

    const links = req.body.links ? JSON.parse(req.body.links) : [];
    const skillsArray = skills.split(';').filter(skill => skill !== '');

    try {
        await Applicant.findByIdAndUpdate(
            _id,
            { name, surname, email, phoneNumber, birthDate, homeAddress, links, skills: skillsArray },
            { runValidators: true }
        );

        if (req.session.profilePicChanged) {
            fs.unlinkSync(`./public/uploads/${_id}/profilePicture.png`);
            fs.renameSync(`./public/uploads/${_id}/profilePicture_new.png`, `./public/uploads/${_id}/profilePicture.png`);
            req.session.profilePicChanged = false;
        }
        res.sendStatus(200);
    }
    catch (e) {
        let errors = [];

        if (e.code === 11000) {
            errors.push('Email already in use');
        }

        if (e.errors) {
            Object.values(e.errors).forEach(({ properties }) => {
                if (properties.message) {
                    errors.push(properties.message);
                }
            });
        }

        console.log(e);
        res.status(400).json({ errors });
    }
}

const profile_get = async (req, res) => {
    try {
        const _id = req.session.applicant._id;
        const applicant = (await Applicant.findById(_id)).toObject();
        const applicantSkills = (await Skill.find({ _id: { $in: applicant.skills } })).map(skill => skill.toObject());
        if (!applicant) {
            // not found, return not found
            res.sendStatus(404);
        } else {
            const hasProfilePic = fs.existsSync(`./public/uploads/${_id}/profilePicture.png`);
            res.render('profile/applicantProfile', { title: 'Your Profile', applicant, hasProfilePic, user: req.session.applicant, scrollable: true, pickedSkills: applicant.skills, skillsNames: applicantSkills });
        }
    }
    catch (e) {
        console.log(e);
    }
}

const docs_get = async (req, res) => {
    try {
        const _id = req.session.applicant._id;
        const applicant = (await Applicant.findById(_id)).toObject();
        if (!applicant) {
            // not found, return not found
            console.log("Applicant not found!");
            res.sendStatus(404);
        } else {
            const userDir = `./public/uploads/${_id}/docs/`;
            if (!fs.existsSync(userDir)) {
                // doesnt exist, retrun not found
                console.log("Dir doesnt exist");
                res.sendStatus(404);
            } else { 
                // exists, get files
                const files = fs.readdirSync(userDir);
                res.send(files);
            }
        }
    }
    catch (e) {
        console.log(e);
    }
}
const file_delete = async (req, res) => {
    const filename = req.body.filename;

    //TODO - handle middleware errors
    try {
        const _id = req.session.applicant._id;

        const applicant = await Applicant.findById(_id);
        if (!applicant) {
            // not found, return not found
            res.sendStatus(404);
        }

        // check if user dir exists
        const userDir = `./public/uploads/${_id}/docs/`;
        if (!fs.existsSync(userDir)) {
            // doesnt exist, retrun not found
            console.log("Dir doesnt exist");
            res.sendStatus(404);
        } else {
            // exists, check if file exists
            const filePath = `${userDir}/${filename}`;
            if (!fs.existsSync(filePath)) {
                // doesnt exist, retrun not found
                console.log("File doesnt exist");
                res.sendStatus(404);
            } else {
                // exists, delete file
                try {
                    fs.unlinkSync(filePath);

                    // file deleted, remove from db
                    await Applicant.findByIdAndUpdate(
                        _id,
                        { $pull: { uploadedDocuments: filename } }
                    );

                    res.sendStatus(200);
                } catch (e) {
                    console.log(e);
                    res.sendStatus(500);
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
}

const docs_upload_post = async (req, res) => {
    const _id = req.session.applicant._id;

    const applicant = await Applicant.findById(_id);

    if (!applicant) {
        res.sendStatus(404);
    }

    try {
        applicant.uploadedDocuments.push(req.file.filename);
        await applicant.save({ validateBeforeSave: false });
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const passwordUpdate_post = async (req, res) => {
    const _id = req.session.applicant._id;
    const applicant = (await Applicant.findById(_id));
    if (!applicant) {
        // not found, return not found
        console.log("Applicant not found!");
        res.sendStatus(404);
    } else {
        const { oldPassword, newPassword, repeatNewPassword } = req.body;
        try {
            if (! await bcrypt.compare(oldPassword, applicant.password)) {
                res.sendStatus(400).json({ errors: ['Wrong password'] });
            } else {
                applicant.password = newPassword;
                await applicant.save();
                res.sendStatus(200);
            }
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
}
module.exports = {
    profile_post,
    profile_get,
    docs_upload_post,
    file_delete,
    docs_get,
    passwordUpdate_post
};
