const util = require("util");
const multer = require("multer");
const maxSize = 100 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/files/");
  },
  filename: (req, file, cb) => {
    console.log("file:", file);
    cb(null, file.originalname);
  },
});

let uploadFiles = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).any('files');

let uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;
