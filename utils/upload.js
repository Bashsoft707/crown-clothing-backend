const multer = require("multer");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, callback) => {
    if (
      !file.originalname.match(/\.(jpg|jpeg|png|gif|mp3|pdf|mp4|webp|svg)$/i)
    ) {
      return callback(new Error("Only image files are accepted!"), false);
    }
    callback(null, true);
  },
});
