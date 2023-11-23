const multer = require("multer");
const path = require("path");

const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    return cb(
      new Error(
        "Invalid file type. Only images with jpg, jpeg, or png extensions are allowed."
      ),
      false
    );
  }

  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../bucket_dev"));
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const timestamp = Date.now();
    const fileName = `image-${timestamp}${extname}`;
    cb(null, fileName);

    // Add the uploaded file name to the request object
    req.uploadedFilename = fileName;
  },
});

// Create a multer instance with the defined storage
const upload = multer({
  storage: storage,
  // 5 MB max file size
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter,
});

const imageUploadMiddleware = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      err.status = 400;
      return next(err);
    } else if (err) {
      return res.status(400).send({
        status: "Bad Request",
        message: "Multer error: " + err.message,
      });
    }
    next();
  });
};

module.exports = {
  fileFilter,
  imageUploadMiddleware,
};
