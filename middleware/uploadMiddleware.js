const multer = require('multer');
const fs = require('fs');

const getDocsUploadPath = req =>  './uploads/docs/' /* + req.user._id */ + '64397e2fbed0bea2e17824d2';

const uploadStorage = multer.diskStorage({
    dest: function(req, file, cb) {
        const path = getDocsUploadPath(req);
        if(!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
        cb(null, path /* + req.user._id */);
    },
    filename: function(req, file, cb) {
        if(fs.existsSync(getDocsUploadPath(req) + file.filename)) {
            console.log("Existing file upload attempted!");
            return cb(new Error("Existing file upload attempted!"));
        }
    }
 });

 const docsUpload = multer({
    storage: uploadStorage,
    limits: {
        filesize: 25000000
    },

 });

 module.exports = { docsUpload };