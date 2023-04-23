const multer = require('multer');
const fs = require('fs');

const getUploadPath = req => (__dirname + '\\..\\public\\uploads\\' /* + req.user._id */ + '64397e2fbed0bea2e17824d2');

const docsUploadStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        const path = getUploadPath(req) + '\\docs\\';
        if(!fs.existsSync(path)) {
            console.log('Path does not exist: ' + path + ' creating...');
            fs.mkdirSync(path);
        }
        cb(null, path);
    },
    filename: function(req, file, cb) {
        if(fs.existsSync(getUploadPath(req) + '\\docs\\' + file.originalname)) {
            console.log('Existing file upload attempted!');
            return cb(new Error('Existing file upload attempted!'));
        }
        cb(null, file.originalname);
    }
 });

 const profilePicUploadStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        const path = getUploadPath(req);
        cb(null, path);
    },
    filename: function(req, file, cb) {
        if(fs.existsSync(getUploadPath(req) + '\\profilePicture.png')) {
            console.log('Existing profile pic upload attempted. Overwriting...');
        } else {
            console.log('New profile pic upload');
        }
    }
 });


 const docsUpload = multer({
    storage: docsUploadStorage,
    limits: {
        filesize: 25000000
    },
    fileFilter: (req, res, cb) => {
        // TODO: limit file extensions
        cb(null, true);
    }
 });

 const profilePicUpload = multer({
    storage: profilePicUploadStorage,
    limits: {
        filesize: 25000000
    },
    fileFilter: (req, res, cb) => {
        // TODO: limit file extensions
        cb(null, true);
    }
 });

 module.exports = { docsUpload, profilePicUpload };