const express = require("express");
const router = express.Router();
const {
  validateUserInsert,
  validateUserUpdate,
} = require("../middlewares/validators/userValidator");

const {
  getAll,
  getById,
  addUser,
  deleteById,
  updateById,
} = require("../controllers/userController");

router.get("/test", (req, res) => {
  res.send("helllow");
});

router.get("/", getAll);

router.get("/:userId", getById);

router.post("/", validateUserInsert, addUser);

router.delete("/:userId", deleteById);

router.patch("/:userId", validateUserUpdate, updateById);

module.exports = router;
