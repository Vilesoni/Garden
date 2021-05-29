function checkFileExist(fileName) {
  const file = new Image();
  file.src = fileName;
  console.log(file.src);
}

module.exports = {
  checkFileExist,
};
