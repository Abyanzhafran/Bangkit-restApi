const { Storage } = require("@google-cloud/storage");
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

// Set up Google Cloud Storage, GCP function
const storage = new Storage();
const bucketName = "temp-bucket-41212";

const multerStorage = multer.memoryStorage();
const upload = multer({
  storage: multerStorage,
  fileFilter: fileFilter,
});

// The middleware will directly execute this code
// so the code execution will ended here
const imageUploadMiddleware = (req, res, next) => {
  upload.single("file")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      err.status = 400;
      err.message = "Multer error: " + err.message;
      return next(err);
    } else if (err) {
      return res.status(400).send({
        status: "Bad Request",
        message: "Multer error: " + err.message,
      });
    }

    if (req.file === undefined) {
      res.status(400).send({
        status: "Bad Request",
        message: "No file uploaded.",
      });
      return;
    }

    try {
      // Upload the file to Google Cloud Storage
      await storage
        .bucket(bucketName)
        .file(req.file.originalname)
        .save(req.file.buffer);

      const publicImageUrl = `https://storage.googleapis.com/${bucketName}/${req.file.originalname}`;
      req.uploadedImageUrl = publicImageUrl;
      next();
    } catch (uploadError) {
      // Handle Google Cloud Storage upload error
      next(uploadError);
    }
  });
};

module.exports = { imageUploadMiddleware };
