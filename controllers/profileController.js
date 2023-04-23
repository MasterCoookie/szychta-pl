const Applicant = require('../models/applicantModel');
const fs = require('fs');

const profile_post = async (req, res) => {
    // TODO read from session
    const _id = '64397e2fbed0bea2e17824d2';
    const { name, surname, email, phoneNumber, birthDate, homeAddress, links } = req.body;

    try {
        await Applicant.findByIdAndUpdate(
            _id,
            { name, surname, email, phoneNumber, birthDate, homeAddress, links },
            { runValidators: true }
        );
        res.sendStatus(200);
    }
    catch (e) {
        let errors = [];

        if (e.code === 11000) {
            errors.push('Email already in use');
        }

        if(e.errors) {
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
        //TMP DUMMY DATA
        // const applicant = new Applicant({ name: 'dupa', surname: 'dupa2', email: 'pat.i.mat233@gmail.com', phoneNumber: '224444444', birthDate: '12.12.2001', homeAddress: 'kasztanowa 52 lipinki łużyckie', links: ['patrzuwa.ga', 'macibol.ga'] });
        // await applicant.save(applicant);
        // res.sendStatus(200);
        res.render('profile/applicantProfile', { title: 'Your Profile' });
    }
    catch (e) {
        console.log(e);
    }
}

const file_delete = async (req, res) => {
    const filename = req.body.filename;

    try {
        const _id = '64397e2fbed0bea2e17824d2'; //TODO - read from session

        const applicant = await Applicant.findById(_id);
        if(!applicant) {
            // not found, return not found
            res.sendStatus(404);
        }

        // check if user dir exists
        const userDir = `./uploads/docs/${_id}`;
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
                        { $pull: { uploadedDocuments: filename } },
                        { runValidators: true }
                    );

                    res.sendStatus(200);
                } catch(e) {
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
    const _id = '64397e2fbed0bea2e17824d2'; //TODO - read from session
    
    const applicant = await Applicant.findById(_id);

    if(!applicant) {
        res.sendStatus(404);
    }

    try {
        applicant.uploadedDocuments.push(req.file.filename);
        await applicant.save();
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

module.exports = { profile_post,
    profile_get,
    docs_upload_post,
    file_delete
};