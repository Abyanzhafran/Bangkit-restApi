const express = require("express");
const router = express.Router();
const {
  validateProductInsert,
  validateProductUpdate,
} = require("../middlewares/validators/productValidator");
const uploadFile = require("../middlewares/custom/imageUpload");

const {
  addProduct,
  getAll,
  getById,
  deleteById,
  updateById,
} = require("../controllers/productController");

router.get("/test", (req, res) => {
  res.send("test product");
});

router.get("/", getAll);

router.get("/:productId", getById);

// We use multiple middleware like this
// First one is for uploadImage and the other's for product data validator
router.post(
  "/",
  uploadFile.imageUploadMiddleware,
  validateProductInsert,
  addProduct
);

router.delete("/:productId", deleteById);

router.patch("/:productId", validateProductUpdate, updateById);

module.exports = router;
