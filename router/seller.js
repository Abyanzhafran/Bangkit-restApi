const express = require("express");
const router = express.Router();
const {
  validateSellerInsert,
  validateSellerUpdate,
} = require("../middlewares/validators/sellerValidator");

const {
  addSeller,
  getAll,
  getById,
  deleteById,
  updateById,
} = require("../controllers/sellerController");

router.get("/test", (req, res) => {
  res.send("helllow");
});

router.get("/", getAll);

router.get("/:sellerId", getById);

router.post("/", validateSellerInsert, addSeller);

router.delete("/:sellerId", deleteById);

router.patch("/:sellerId", validateSellerUpdate, updateById);

module.exports = router;
