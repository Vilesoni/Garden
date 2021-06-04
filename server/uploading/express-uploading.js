const path = require("path");
const fs = require("fs-extra");

const tempPath = "./tmpUploadings/";
const uploadPath = "../garden/public/upload/";

const saveFile = (req, res) => {
  try {
    const file = req.files.file;
    const fileName =
      path.parse(file.name).name +
      new Date().getMilliseconds() +
      path.parse(file.name).ext;
    const filePath = tempPath + fileName;
    file.mv(filePath, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send(fileName);
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Upload error!" });
  }
};

const moveFile = (req, res) => {
  const fileName = req.body.fileName;
  const folder = req.body.folder;
  const userId = req.body.userId;
  var destination = "";
  switch (folder) {
    case "articles":
      destination = uploadPath + userId + "/articles/" + fileName;
      break;
    case "profile":
      destination = uploadPath + userId + "/profile/" + fileName;
      break;
    default:
      break;
  }
  if (fs.access(destination)) {
    fs.move(tempPath + fileName, destination, (err) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send("File has been moved!");
      }
    });
  } else {
    res.send("No such file or directory!");
  }
};

const removeFile = (req, res) => {
  const fileName = req.body.fileName;
  const folder = req.body.folder;
  const userId = req.body.userId;
  var destination = "";
  switch (folder) {
    case "articles":
      destination = uploadPath + userId + "/articles/" + fileName;
      break;
    case "profile":
      destination = uploadPath + userId + "/profile/" + fileName;
      break;
    default:
      break;
  }
  if (fs.access(destination)) {
    fs.unlink(destination, (err) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log("File has been deleted!");
        res.send("File has been deleted!");
      }
    });
  } else {
    res.send("No such file or directory!");
  }
};
module.exports = {
  saveFile,
  moveFile,
  removeFile,
};
