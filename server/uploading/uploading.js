const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `../garden/public/images`);
  },
  filename: (req, file, cb) => {
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
const remove = (req,res,next) => {
  const fileName = req.body.fileName;
  fs.unlink(`../garden/public/images/${fileName}`, (err) => {
    if(err){
      res.send(err)
    }else{
      res.send("deleted");
    }
  })
}
module.exports = {
  upload,
  get,
  remove
};
