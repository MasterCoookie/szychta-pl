const multer = require('multer');
const fs = require('fs');

const getDocsUploadPath = req => (__dirname + '\\..\\uploads\\docs\\' /* + req.user._id */ + '64397e2fbed0bea2e17824d2');

const uploadStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        const path = getDocsUploadPath(req);
        if(!fs.existsSync(path)) {
            console.log('Path does not exist: ' + path + ' creating...');
            fs.mkdirSync(path);
        }
        cb(null, path /* + req.user._id */);
    },
    filename: function(req, file, cb) {
        if(fs.existsSync(getDocsUploadPath(req) + '\\' +file.originalname)) {
            console.log('Existing file upload attempted!');
            return cb(new Error('Existing file upload attempted!'));
        }
        cb(null, file.originalname);
    }
 });


 const docsUpload = multer({
    storage: uploadStorage,
    limits: {
        filesize: 25000000
    },
    fileFilter: (req, res, cb) => {
        // TODO: limit file extensions
        cb(null, true);
    }
 });

 module.exports = { docsUpload };