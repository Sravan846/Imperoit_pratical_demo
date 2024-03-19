const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "uploads/tasks/"); 
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + "_" + file.originalname); // Use the original file name for storing the file
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
