const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `../garden/public/images`);
  },
  filename: (req, file, cb) => {
    console.log(file);
    const fileName =
      path.parse(file.originalname.toString()).name +
      new Date().getMilliseconds() +
      path.parse(file.originalname.toString()).ext;
    cb(null, fileName.toString());
  },
});
const upload = multer({ storage: storage });
const get = (req, res, next) => {
  res.send(req.file.filename);
};
module.exports = {
  upload,
  get,
};
