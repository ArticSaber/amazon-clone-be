import multer from "multer";

const storage = multer.diskStorage({
  filename: function (request, file, callback) {
    callback(null, file.originalname);
  },
  destination: function (request, file, callback) {
    callback(null, "./assets");
  },
});

const upload = multer({ storage });
export default upload;
