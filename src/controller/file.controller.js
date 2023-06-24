const uploadFile = require("../middleware/upload");
const uploadFiles = require("../middleware/uploads");
const fs = require("fs");
const baseUrl = "http://119.23.232.239:50000/files/";

const upload = async (req, res) => {
  try {

    await uploadFile(req, res);

    console.log("upload:", req.file);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
	
    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
      url: baseUrl + req.file.filename,
    });
    
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 20MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const uploads = async (req, res) => {
  try {
    await uploadFiles(req, res);

    if (req.files == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    var urls = [];
    for(var i=0;i< req.files.length;i++){
        urls.push(baseUrl + req.files[i].filename);
    }

    res.status(200).send({
      message: req.files.length + " files were uploaded successfully",
      urls: urls,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/files/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/files/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

const remove = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/files/";

  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete the file. " + err,
      });
    }

    res.status(200).send({
      message: "File is deleted.",
    });
  });
};

const removeSync = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/files/";

  try {
    fs.unlinkSync(directoryPath + fileName);

    res.status(200).send({
      message: "File is deleted.",
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not delete the file. " + err,
    });
  }
};

module.exports = {
  upload,
  uploads,
  getListFiles,
  download,
  remove,
  removeSync,
};
