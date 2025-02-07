const util = require("util");
const multer = require("multer");
const maxSize = 100 * 1024 * 1024;
const crypto = require('crypto');
const path = require('path');
const stream = require('stream');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/files/");
  },
  filename: (req, file, cb) => {
    // console.log("file:", file);
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
