const express = require("express");
const router = express.Router();
const {
  validateTransactionInsert,
} = require("../middlewares/validators/transactionValidator");

const {
  addTransaction,
  getAll,
  getById,
  deleteById,
} = require("../controllers/transactionController");

router.get("/test", (req, res) => {
  res.send("helllow transaction");
});

router.get("/", getAll);

router.get("/:transactionId", getById);

router.post("/", validateTransactionInsert, addTransaction);

router.delete("/:transactionId", deleteById);

module.exports = router;
